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
//
// The production server leaves UPLOAD_DIR unset and writes to
// storage/uploads/production, which is committed to git as a backup of the
// live images. Local machines set UPLOAD_DIR="storage/uploads/local" in .env,
// a git-ignored folder, so test uploads never end up in the repo.
export const UPLOAD_DIR: string =
  process.env.UPLOAD_DIR || "storage/uploads/production";

// Hard cap on a single uploaded file.
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

// Catalogue PDFs are larger than photos, so they get their own cap.
export const MAX_CATALOGUE_BYTES = 20 * 1024 * 1024; // 20 MB

// Contact form enquiries are appended to this JSON file. Like uploads it sits
// outside public/, so it can never be fetched by URL, and it is git-ignored.
export const ENQUIRIES_FILE: string = "storage/enquiries/enquiries.json";
