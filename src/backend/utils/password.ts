import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;
const PREFIX = "scrypt";

/** Produces "scrypt:<salt-hex>:<hash-hex>". */
export const hashPassword = async (plain: string): Promise<string> => {
  const salt = randomBytes(16);
  const derived = await scrypt(plain, salt, KEY_LENGTH);
  return `${PREFIX}:${salt.toString("hex")}:${derived.toString("hex")}`;
};

export const isHashed = (stored: string): boolean =>
  typeof stored === "string" && stored.startsWith(`${PREFIX}:`);

/**
 * Constant-time password check.
 *
 * Rows created before password hashing was introduced hold the plaintext
 * password; those are compared directly so existing admins are not locked
 * out, and the caller re-hashes on the next successful login.
 */
export const verifyPassword = async (
  plain: string,
  stored: string,
): Promise<boolean> => {
  if (!stored) return false;

  if (!isHashed(stored)) {
    const a = Buffer.from(plain);
    const b = Buffer.from(stored);
    return a.length === b.length && timingSafeEqual(a, b);
  }

  const [, saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;

  const expected = Buffer.from(hashHex, "hex");
  const derived = await scrypt(plain, Buffer.from(saltHex, "hex"), KEY_LENGTH);

  return expected.length === derived.length && timingSafeEqual(expected, derived);
};
