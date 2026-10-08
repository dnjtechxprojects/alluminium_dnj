import path from "path";
import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import { ENQUIRIES_FILE } from "@/backend/utils/config";

export type EnquiryInput = {
  name: string;
  company: string;
  phone: string;
  email: string;
  task: string;
};

export type Enquiry = EnquiryInput & {
  id: string;
  createdAt: string;
};

const enquiriesFile = (): string =>
  path.resolve(/*turbopackIgnore: true*/ process.cwd(), ENQUIRIES_FILE);

const readEnquiries = async (file: string): Promise<Enquiry[]> => {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    // A corrupt file must fail loudly rather than be overwritten with [].
    throw error;
  }
};

// Writes run one at a time, so two enquiries arriving together can't both
// read the old file and overwrite each other's entry.
let writeQueue: Promise<unknown> = Promise.resolve();

/**
 * Appends an enquiry to the enquiries JSON file and returns the stored entry.
 */
export const saveEnquiry = (input: EnquiryInput): Promise<Enquiry> => {
  const write = async () => {
    const file = enquiriesFile();
    await mkdir(path.dirname(file), { recursive: true });

    const enquiries = await readEnquiries(file);
    const enquiry: Enquiry = {
      id: randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    enquiries.push(enquiry);

    // Write a temp file and rename it over the old one, so a crash mid-write
    // never leaves a half-written file behind.
    const tempFile = `${file}.tmp`;
    await writeFile(tempFile, JSON.stringify(enquiries, null, 2));
    await rename(tempFile, file);

    return enquiry;
  };

  const result = writeQueue.then(write, write);
  writeQueue = result.catch(() => {});
  return result;
};
