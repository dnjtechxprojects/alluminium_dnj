import path from "path";
import { UPLOAD_DIR } from "@/backend/utils/config";

/**
 * Absolute path to the upload directory.
 *
 * The location is configurable at runtime, so the bundler cannot (and should
 * not) trace it — hence the ignore comment.
 */
export const uploadDir = (): string =>
  path.resolve(/*turbopackIgnore: true*/ process.cwd(), UPLOAD_DIR);

/**
 * Resolves a caller-supplied filename inside the upload directory, or null if
 * it would escape it.
 */
export const resolveUploadPath = (filename: string): string | null => {
  const dir = uploadDir();
  const safeFilename = path.basename(filename);
  const filePath = path.join(dir, safeFilename);

  // path.join already normalises, but confirm containment explicitly.
  if (filePath !== path.join(dir, path.basename(filePath))) return null;
  if (!filePath.startsWith(dir + path.sep)) return null;

  return filePath;
};
