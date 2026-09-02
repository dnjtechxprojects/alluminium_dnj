/**
 * One-time seed: creates the single admin account below.
 *
 *   node scripts/seed-admin.cjs
 *
 * Refuses to run if that username already exists.
 */
const path = require("node:path");
const { randomBytes, scrypt } = require("node:crypto");
const { promisify } = require("node:util");

const scryptAsync = promisify(scrypt);

const USERNAME = "admin@natrajaluform.com";
const PASSWORD = "Natraj@0#912345678";

async function hashPassword(plain) {
  const salt = randomBytes(16);
  const derived = await scryptAsync(plain, salt, 64);
  return `scrypt:${salt.toString("hex")}:${derived.toString("hex")}`;
}

function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env");
  try {
    process.loadEnvFile(envPath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
}

async function main() {
  loadEnv();

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    const existing = await prisma.user.findFirst({
      where: { username: USERNAME },
    });

    if (existing) {
      throw new Error(`"${USERNAME}" already exists — refusing to overwrite it.`);
    }

    const hashed = await hashPassword(PASSWORD);
    const user = await prisma.user.create({
      data: { username: USERNAME, password: hashed },
    });

    console.log(`Admin account created: ${user.username}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
