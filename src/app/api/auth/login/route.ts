// PROJECT IMPORT
import {
  internalServerErrorResponse,
  unauthorizedResponse,
  successResponse,
} from "@/backend/utils/apiResponse";
import { getUser, updateUser } from "@/backend/db/services/auth.service";
import { generateToken } from "@/backend/middleware/common/token.middleware";
import { hashPassword, isHashed, verifyPassword } from "@/backend/utils/password";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const username = typeof req?.username === "string" ? req.username : "";
    const password = typeof req?.password === "string" ? req.password : "";

    if (!username || !password) {
      return unauthorizedResponse({ message: "Invalid username or password" });
    }

    const data = await getUser({ where: { username } });

    // One generic message for both cases so the endpoint cannot be used to
    // enumerate valid usernames.
    if (!data?.username || !(await verifyPassword(password, data.password))) {
      return unauthorizedResponse({ message: "Invalid username or password" });
    }

    // Transparently upgrade legacy plaintext rows to a hash on first login.
    if (!isHashed(data.password)) {
      await updateUser({
        where: { id: data.id },
        data: { password: await hashPassword(password) },
      });
    }

    const token = await generateToken({ id: data.id, username: data.username });

    return successResponse({
      message: `Login Successfully`,
      data: {
        username: data.username,
        access_token: token,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
