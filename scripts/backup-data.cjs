// Backs up the PRODUCT and BLOG rows of the database in DATABASE_URL to
// scripts/old-data.json, the same file import-data.cjs restores from.
//
// Run it on the production server, then commit old-data.json together with
// storage/uploads/production and push, so the repo holds a full backup:
//
//   pnpm backup-data
//   git add scripts/old-data.json storage/uploads/production
//   git commit -m "Back up production data" && git push
//
// User rows are deliberately NOT backed up: they hold password hashes, which
// must never be committed. The admin account is created by scripts/seed.cjs.
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const dataPath = path.join(__dirname, "old-data.json");
const envPath = path.join(projectRoot, ".env");

// Oldest first, with id as a tie-breaker, so re-running the backup on
// unchanged data rewrites the file byte for byte and git sees no change.
const orderBy = [{ createdAt: "asc" }, { id: "asc" }];

function missingUploads(rows) {
  const uploadDir = path.resolve(
    projectRoot,
    process.env.UPLOAD_DIR || "storage/uploads/production",
  );

  return rows
    .map((row) => row.image)
    // Blogs may have no image, and very old rows may carry a full URL.
    .filter((image) => image && !/^(data:|https?:)/.test(image))
    .map((image) => path.basename(image))
    .filter((image) => !fs.existsSync(path.join(uploadDir, image)));
}

async function main() {
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

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    const [products, blogs] = await Promise.all([
      prisma.product.findMany({ orderBy }),
      prisma.blog.findMany({ orderBy }),
    ]);

    const data = {
      Product: products.map((product) => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        description: product.description,
        image: product.image,
        page: product.page,
        createdAt: product.createdAt.toISOString(),
      })),
      Blog: blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        slug: blog.slug,
        image: blog.image,
        createdAt: blog.createdAt.toISOString(),
      })),
    };

    fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
    console.log(
      `Backed up ${products.length} product(s) and ${blogs.length} blog(s) to ${path.relative(projectRoot, dataPath)}.`,
    );

    const missing = missingUploads([...products, ...blogs]);
    if (missing.length > 0) {
      console.warn(
        `Warning: ${missing.length} image(s) used by the data are not in the upload folder:\n  ${missing.join("\n  ")}`,
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Data backup failed:", error.message);
  process.exitCode = 1;
});
