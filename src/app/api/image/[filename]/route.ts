import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { stat, readFile } from "fs/promises";
import {
  notFoundResponse,
  internalServerErrorResponse,
} from "@/backend/utils/apiResponse";
import { resolveUploadPath } from "@/backend/utils/uploadPath";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const { filename } = await params;

    // Strip any directory component and confirm the resolved path is still
    // inside the upload directory before touching the filesystem.
    const filePath = resolveUploadPath(filename);

    if (!filePath) {
      return notFoundResponse({ message: "Image not found" });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext];

    // Only ever serve known image types — never a generic octet-stream.
    if (!contentType) {
      return notFoundResponse({ message: "Image not found" });
    }

    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) throw new Error();
    } catch {
      return notFoundResponse({ message: "Image not found" });
    }

    const fileBuffer = await readFile(filePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("IMAGE ERROR:", error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
