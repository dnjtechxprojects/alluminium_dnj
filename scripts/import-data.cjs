// Restores PRODUCT and BLOG rows from scripts/old-data.json, the file written
// by backup-data.cjs. Rows are upserted by id, so re-running it is safe and
// nothing that is missing from the file gets deleted.
//
// User rows are deliberately NOT imported: old-data.json once carried a
// plaintext password, and re-running this would have overwritten a hashed
// password with that plaintext value. Admin accounts are managed separately.
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const dataPath = path.join(__dirname, "old-data.json");
const envPath = path.join(projectRoot, ".env");
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

async function main() {
  const { products, blogs } = readOldData();
  const summary = `${products.length} product(s) and ${blogs.length} blog(s)`;

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

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    await prisma.$transaction(async (transaction) => {
      for (const product of products) {
        const { id, ...values } = product;

        await transaction.product.upsert({
          where: { id },
          create: product,
          update: values,
        });
      }

      for (const blog of blogs) {
        const { id, ...values } = blog;

        await transaction.blog.upsert({
          where: { id },
          create: blog,
          update: values,
        });
      }
    });

    console.log(`Imported ${summary}.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Old data import failed:", error.message);
  process.exitCode = 1;
});
