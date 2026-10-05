import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { stat, readFile } from "fs/promises";
import {
  notFoundResponse,
  internalServerErrorResponse,
} from "@/backend/utils/apiResponse";
import { uploadDir } from "@/backend/utils/uploadPath";
import { catalogueFileName, getCatalogue } from "@/lib/catalogue";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slot: string }> },
) {
  try {
    const { slot } = await params;

    // Only the fixed slots resolve to a file, so the caller never controls
    // the path that is read.
    const catalogue = getCatalogue(slot);

    if (!catalogue) {
      return notFoundResponse({ message: "Catalogue not found" });
    }

    const filePath = path.join(uploadDir(), catalogueFileName(catalogue.slot));

    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) throw new Error();
    } catch {
      return notFoundResponse({ message: "Catalogue not found" });
    }

    const fileBuffer = await readFile(filePath);
    const downloadName = `${catalogue.title.replace(/[^\w .-]/g, "")}.pdf`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "X-Content-Type-Options": "nosniff",
        // Same URL is reused when the PDF is replaced, so don't let it go stale.
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("CATALOGUE ERROR:", error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
