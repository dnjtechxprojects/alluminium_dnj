// Backs up the live site to this machine in one command:
//
//   pnpm backup-data
//
// - product and blog rows  → scripts/old-data.json (what import-data.cjs restores)
// - the images they use and the catalogue PDFs → storage/uploads/production
//
// It reads only the site's public endpoints, so it needs no server login and
// no database access. Set BACKUP_SITE_URL to back up another copy of the site.
// Admin accounts and contact enquiries are not public, so they are not included.
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const dataPath = path.join(__dirname, "old-data.json");
const envPath = path.join(projectRoot, ".env");
// Same layout as the server, whatever UPLOAD_DIR this machine uses itself.
const backupDir = path.join(projectRoot, "storage", "uploads", "production");

// The list endpoints cap a page at 20 rows.
const PAGE_SIZE = 20;

async function get(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GET ${url} returned ${response.status}`);
  }

  return response;
}

async function fetchAll(siteUrl, endpoint) {
  const rows = [];

  for (let page = 1; ; page += 1) {
    const response = await get(`${siteUrl}${endpoint}?limit=${PAGE_SIZE}&page=${page}`);
    const body = await response.json();

    rows.push(...body.data);

    // Products report paging under "meta", blogs at the top level.
    const hasNextPage = body.meta ? body.meta.hasNextPage : body.hasNextPage;
    if (!hasNextPage || body.data.length === 0) return rows;
  }
}

// Oldest first, with id as a tie-breaker, so backing up unchanged data
// rewrites the file byte for byte and git sees no change.
function byAge(a, b) {
  return a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id);
}

// Write beside the target and rename over it, so an interrupted download
// never leaves a half-written file behind.
async function download(url, target) {
  const response = await get(url);
  const temp = `${target}.download`;

  fs.writeFileSync(temp, Buffer.from(await response.arrayBuffer()));
  fs.renameSync(temp, target);
}

function imageNames(rows) {
  const names = rows
    .map((row) => row.image)
    // Blogs may have no image, and very old rows may carry a full URL.
    .filter((image) => image && !/^(data:|https?:)/.test(image))
    .map((image) => path.basename(image));

  return [...new Set(names)];
}

async function main() {
  try {
    process.loadEnvFile(envPath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const siteUrl = (process.env.BACKUP_SITE_URL || "https://natrajaluform.com").replace(/\/+$/, "");
  console.log(`Backing up ${siteUrl}`);

  const [products, blogs] = await Promise.all([
    fetchAll(siteUrl, "/api/product"),
    fetchAll(siteUrl, "/api/blog"),
  ]);

  fs.mkdirSync(backupDir, { recursive: true });
  const failed = [];

  // Upload names are unique and never reused, so a file already on disk is
  // already the right one and is skipped.
  let downloaded = 0;
  const images = imageNames([...products, ...blogs]);

  for (const image of images) {
    const target = path.join(backupDir, image);
    if (fs.existsSync(target)) continue;

    try {
      await download(`${siteUrl}/api/image/${encodeURIComponent(image)}`, target);
      downloaded += 1;
    } catch (error) {
      failed.push(error.message);
    }
  }

  // Catalogues keep a fixed name and can be replaced, so always re-download.
  const catalogueResponse = await get(`${siteUrl}/api/catalogue`);
  const catalogues = (await catalogueResponse.json()).data;

  for (const { slot } of catalogues) {
    try {
      await download(
        `${siteUrl}/api/catalogue/${slot}`,
        path.join(backupDir, `catalogue-${slot}.pdf`),
      );
    } catch (error) {
      failed.push(error.message);
    }
  }

  const data = {
    Product: products.sort(byAge).map((product) => ({
      id: product.id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      image: product.image,
      page: product.page,
      createdAt: product.createdAt,
    })),
    Blog: blogs.sort(byAge).map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      slug: blog.slug,
      image: blog.image,
      createdAt: blog.createdAt,
    })),
  };

  fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);

  const folder = path.relative(projectRoot, backupDir);
  console.log(`Saved ${products.length} product(s) and ${blogs.length} blog(s) to ${path.relative(projectRoot, dataPath)}.`);
  console.log(`Images: ${downloaded} downloaded, ${images.length - downloaded - failed.length} already in ${folder}.`);
  console.log(`Catalogues: ${catalogues.length} downloaded.`);

  if (failed.length > 0) {
    throw new Error(`${failed.length} file(s) could not be downloaded:\n  ${failed.join("\n  ")}`);
  }
}

main().catch((error) => {
  console.error("Data backup failed:", error.message);
  process.exitCode = 1;
});
