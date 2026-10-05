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
import { MAX_CATALOGUE_BYTES } from "@/backend/utils/config";
import { uploadDir } from "@/backend/utils/uploadPath";
import { CATALOGUES, catalogueFileName, getCatalogue } from "@/lib/catalogue";

/**
 * Lists the catalogue slots that currently have a PDF, with when each was
 * last replaced. Public: the Extruded Products page uses it to decide which
 * download buttons to show.
 */
export async function GET() {
  try {
    const dir = uploadDir();

    const items = await Promise.all(
      CATALOGUES.map(async ({ slot }) => {
        try {
          const fileStat = await fs.stat(path.join(dir, catalogueFileName(slot)));
          if (!fileStat.isFile()) return null;
          return { slot, updatedAt: fileStat.mtime.toISOString() };
        } catch {
          return null;
        }
      }),
    );

    return successResponse({ data: items.filter(Boolean) });
  } catch (error) {
    console.error("CATALOGUE LIST ERROR:", error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.ok) return auth.response;

    const formData = await req.formData();
    const slot = formData.get("slot");
    const file = formData.get("file");

    const catalogue = typeof slot === "string" ? getCatalogue(slot) : undefined;

    if (!catalogue) {
      return invalidDataResponse({ message: "Invalid catalogue" });
    }

    if (!(file instanceof File)) {
      return invalidDataResponse({ message: "No file uploaded" });
    }

    if (file.size === 0 || file.size > MAX_CATALOGUE_BYTES) {
      return invalidDataResponse({
        message: `File must be between 1 byte and ${MAX_CATALOGUE_BYTES / (1024 * 1024)} MB`,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Re-check after reading: file.size is a client-declared value.
    if (buffer.byteLength > MAX_CATALOGUE_BYTES) {
      return invalidDataResponse({ message: "File too large" });
    }

    // As with images, trust the bytes rather than the filename or the
    // multipart Content-Type.
    if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return invalidDataResponse({ message: "Invalid file format. Allowed: PDF" });
    }

    const dir = uploadDir();
    await fs.mkdir(dir, { recursive: true });

    // Write beside the target and rename over it, so a download running
    // while the PDF is being replaced never sees a half-written file.
    const target = path.join(dir, catalogueFileName(catalogue.slot));
    const temp = `${target}.${randomBytes(8).toString("hex")}.tmp`;

    await fs.writeFile(temp, buffer);
    await fs.rename(temp, target);

    return successResponse({
      message: `${catalogue.title} uploaded successfully`,
      data: { slot: catalogue.slot, updatedAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error("CATALOGUE UPLOAD ERROR:", error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
