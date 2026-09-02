// Auth secret. MUST be provided via the environment — never hardcoded.
// Generate one with:  openssl rand -base64 48
const rawSecret = process.env.AUTH_SECRET;

if (!rawSecret || rawSecret.length < 32) {
  throw new Error(
    "AUTH_SECRET is missing or too short. Set AUTH_SECRET (>= 32 chars) in your environment.",
  );
}

export const SECRET_KEY: string = rawSecret;

// Where uploaded files live on disk. Deliberately OUTSIDE public/ so that
// nothing written by an upload can ever be served as a static asset.
export const UPLOAD_DIR: string =
  process.env.UPLOAD_DIR || "storage/uploads";

// Hard cap on a single uploaded file.
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
