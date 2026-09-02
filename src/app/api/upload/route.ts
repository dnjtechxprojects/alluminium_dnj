import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import { randomBytes } from "node:crypto";
import {
  internalServerErrorResponse,
  invalidDataResponse,
  successResponse,
} from "@/backend/utils/apiResponse";
import { requireAuth } from "@/backend/middleware/common/token.middleware";
import { MAX_UPLOAD_BYTES } from "@/backend/utils/config";
import { uploadDir } from "@/backend/utils/uploadPath";

/**
 * Identifies an image from its leading bytes.
 *
 * The multipart `Content-Type` and the filename are both supplied by the
 * caller, so neither is trusted: the stored extension is derived from what
 * the bytes actually are.
 */
const sniffImageType = (
  buffer: Buffer,
): { ext: string; mime: string } | null => {
  if (buffer.length < 12) return null;

  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { ext: ".png", mime: "image/png" };
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: ".jpg", mime: "image/jpeg" };
  }
  if (
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { ext: ".webp", mime: "image/webp" };
  }
  const gif = buffer.subarray(0, 6).toString("ascii");
  if (gif === "GIF87a" || gif === "GIF89a") {
    return { ext: ".gif", mime: "image/gif" };
  }

  return null;
};

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.ok) return auth.response;

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return invalidDataResponse({ message: "No file uploaded" });
    }

    if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
      return invalidDataResponse({
        message: `File must be between 1 byte and ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB`,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Re-check after reading: file.size is a client-declared value.
    if (buffer.byteLength > MAX_UPLOAD_BYTES) {
      return invalidDataResponse({ message: "File too large" });
    }

    const detected = sniffImageType(buffer);

    if (!detected) {
      return invalidDataResponse({
        message: "Invalid file format. Allowed: PNG, JPEG, WebP, GIF",
      });
    }

    // Name and extension are generated server-side, so nothing the caller
    // sends can influence the path or the type of the file written.
    const dir = uploadDir();
    await fs.mkdir(dir, { recursive: true });

    const fileName = `${Date.now()}-${randomBytes(8).toString("hex")}${detected.ext}`;

    await fs.writeFile(path.join(dir, fileName), buffer);

    return successResponse({ data: { url: fileName } });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
