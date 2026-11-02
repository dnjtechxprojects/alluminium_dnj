// Restores PRODUCT and BLOG rows from scripts/old-data.json, the file written
// by backup-data.cjs. It REPLACES both tables: every existing product and blog
// is deleted and the file's rows are inserted, in one transaction, so a failure
// leaves the database exactly as it was. Before that, the current rows are
// saved to storage/backups/before-import-<time>.json, which is in the same
// format and can itself be restored by copying it over old-data.json.
//
// On a laptop it first copies the images the rows use, and the catalogue
// PDFs, from storage/uploads/production (where backup-data.cjs saves them)
// into the UPLOAD_DIR the site reads, so the restored pages show their images.
//
// User rows are deliberately NOT imported: old-data.json once carried a
// plaintext password, and re-running this would have overwritten a hashed
// password with that plaintext value. Admin accounts are managed separately.
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const dataPath = path.join(__dirname, "old-data.json");
const envPath = path.join(projectRoot, ".env");
const backupDir = path.join(projectRoot, "storage", "uploads", "production");
const snapshotDir = path.join(projectRoot, "storage", "backups");
const productPages = new Set([
  "DIEMANUFACTURING",
  "EXTRUDEDPRODUCTS",
  "FABRICATION",
  "NEWALLOY",
]);

function requiredString(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} must be a non-empty string`);
  }

  return value;
}

// Blogs created without a slug or image store an empty string.
function stringValue(value, field) {
  if (typeof value !== "string") {
    throw new Error(`${field} must be a string`);
  }

  return value;
}

function requiredDate(value, field) {
  const dateValue = requiredString(value, field);
  const hasTimezone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(dateValue);
  const date = new Date(hasTimezone ? dateValue : `${dateValue}Z`);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${field} must be a valid date`);
  }

  return date;
}

function readOldData() {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  if (!Array.isArray(data.Product)) {
    throw new Error('old-data.json must contain a "Product" array');
  }

  const products = data.Product.map((product, index) => {
    const page = requiredString(product.page, `Product[${index}].page`);

    if (!productPages.has(page)) {
      throw new Error(`Product[${index}].page has an unsupported value: ${page}`);
    }

    return {
      id: requiredString(product.id, `Product[${index}].id`),
      title: requiredString(product.title, `Product[${index}].title`),
      slug: requiredString(product.slug, `Product[${index}].slug`),
      description: requiredString(
        product.description,
        `Product[${index}].description`,
      ),
      image: requiredString(product.image, `Product[${index}].image`),
      page,
      createdAt: requiredDate(product.createdAt, `Product[${index}].createdAt`),
    };
  });

  // Backups made before blogs were included have no "Blog" key.
  const blogRows = data.Blog ?? [];

  if (!Array.isArray(blogRows)) {
    throw new Error('old-data.json "Blog" must be an array');
  }

  const blogs = blogRows.map((blog, index) => {
    const excerpt = blog.excerpt ?? null;

    return {
      id: requiredString(blog.id, `Blog[${index}].id`),
      title: requiredString(blog.title, `Blog[${index}].title`),
      content: requiredString(blog.content, `Blog[${index}].content`),
      excerpt:
        excerpt === null ? null : stringValue(excerpt, `Blog[${index}].excerpt`),
      slug: stringValue(blog.slug, `Blog[${index}].slug`),
      image: stringValue(blog.image, `Blog[${index}].image`),
      createdAt: requiredDate(blog.createdAt, `Blog[${index}].createdAt`),
    };
  });

  return { products, blogs };
}

function imageNames(rows) {
  const names = rows
    .map((row) => row.image)
    // Blogs may have no image, and very old rows may carry a full URL.
    .filter((image) => image && !/^(data:|https?:)/.test(image))
    .map((image) => path.basename(image));

  return [...new Set(names)];
}

// On the server UPLOAD_DIR is the backup folder itself, so nothing is copied
// there; any image still missing is only reported.
function syncUploads(rows) {
  const uploadDir = path.resolve(
    projectRoot,
    process.env.UPLOAD_DIR || "storage/uploads/production",
  );
  const sameFolder = uploadDir === backupDir;
  let copied = 0;
  const missing = [];

  fs.mkdirSync(uploadDir, { recursive: true });

  // Catalogues keep a fixed name and can be replaced, so the backup's copy wins.
  if (!sameFolder && fs.existsSync(backupDir)) {
    const catalogues = fs
      .readdirSync(backupDir)
      .filter((name) => /^catalogue-\d+\.pdf$/.test(name));

    for (const name of catalogues) {
      fs.copyFileSync(path.join(backupDir, name), path.join(uploadDir, name));
      copied += 1;
    }
  }

  // Upload names are unique and never reused, so an existing file is kept.
  for (const name of imageNames(rows)) {
    if (fs.existsSync(path.join(uploadDir, name))) continue;

    const source = path.join(backupDir, name);
    if (sameFolder || !fs.existsSync(source)) {
      missing.push(name);
      continue;
    }

    fs.copyFileSync(source, path.join(uploadDir, name));
    copied += 1;
  }

  return { folder: path.relative(projectRoot, uploadDir), copied, missing };
}

async function main() {
  const { products, blogs } = readOldData();
  const summary = `${products.length} product(s) and ${blogs.length} blog(s)`;

  // The tables are emptied before inserting, so a broken or empty backup
  // would otherwise wipe the site.
  if (products.length === 0) {
    throw new Error("old-data.json has no products; refusing to replace the database with it");
  }

  if (process.argv.includes("--dry-run")) {
    console.log(`Validated ${summary}.`);
    return;
  }

  try {
    process.loadEnvFile(envPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing environment file: ${envPath}`);
    }

    throw error;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(`DATABASE_URL is missing from ${envPath}`);
  }

  // Files first, so the restored rows never point at images that aren't there.
  const uploads = syncUploads([...products, ...blogs]);

  if (uploads.copied > 0) {
    console.log(`Copied ${uploads.copied} file(s) into ${uploads.folder}.`);
  }

  if (uploads.missing.length > 0) {
    console.warn(
      `Warning: ${uploads.missing.length} image(s) used by the data are not in ${uploads.folder}:\n  ${uploads.missing.join("\n  ")}`,
    );
  }

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    const [currentProducts, currentBlogs] = await Promise.all([
      prisma.product.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.blog.findMany({ orderBy: { createdAt: "asc" } }),
    ]);

    // Same shape as old-data.json, so this snapshot can be restored as is.
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const snapshotPath = path.join(snapshotDir, `before-import-${stamp}.json`);

    fs.mkdirSync(snapshotDir, { recursive: true });
    fs.writeFileSync(
      snapshotPath,
      `${JSON.stringify({ Product: currentProducts, Blog: currentBlogs }, null, 2)}\n`,
    );
    console.log(
      `Saved the current ${currentProducts.length} product(s) and ${currentBlogs.length} blog(s) to ${path.relative(projectRoot, snapshotPath)}.`,
    );

    // One batch transaction: if any insert fails, the deletes roll back too.
    await prisma.$transaction([
      prisma.product.deleteMany(),
      prisma.blog.deleteMany(),
      prisma.product.createMany({ data: products }),
      prisma.blog.createMany({ data: blogs }),
    ]);

    console.log(`Replaced the database contents with ${summary}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Old data import failed:", error.message);
  process.exitCode = 1;
});
