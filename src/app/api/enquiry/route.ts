import {
  internalServerErrorResponse,
  invalidDataResponse,
  successResponse,
} from "@/backend/utils/apiResponse";
import { saveEnquiry, type EnquiryInput } from "@/backend/utils/enquiryStore";

// Max length per field. Anyone can post here, so cap what reaches the file.
const MAX_LENGTHS: Record<keyof EnquiryInput, number> = {
  name: 100,
  company: 150,
  phone: 30,
  email: 254,
  task: 5000,
};

// Same rules as the contact form.
const PHONE_PATTERN = /^\+?[\d\s-]{7,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public on purpose: this is the contact form on the website. It can only
// append an enquiry; nothing here reads the stored enquiries back.
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return invalidDataResponse({ message: "Invalid request" });
  }

  const enquiry = {} as EnquiryInput;

  for (const [field, maxLength] of Object.entries(MAX_LENGTHS)) {
    const value = body?.[field];

    if (typeof value !== "string" || !value.trim()) {
      return invalidDataResponse({ message: "Please fill in every field" });
    }
    if (value.trim().length > maxLength) {
      return invalidDataResponse({ message: `The ${field} is too long` });
    }

    enquiry[field as keyof EnquiryInput] = value.trim();
  }

  if (!PHONE_PATTERN.test(enquiry.phone)) {
    return invalidDataResponse({ message: "Please enter a valid phone number" });
  }
  if (!EMAIL_PATTERN.test(enquiry.email)) {
    return invalidDataResponse({ message: "Please enter a valid email address" });
  }

  try {
    await saveEnquiry(enquiry);

    return successResponse({ message: "Enquiry received" });
  } catch (error) {
    console.error("ENQUIRY ERROR:", error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
