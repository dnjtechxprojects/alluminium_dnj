// PROJECT IMPORT
import { forbiddenResponse, unauthorizedResponse } from "@/backend/utils/apiResponse";
import { getUser } from "@/backend/db/services/auth.service";

// THIRD - PARTY IMPORT
import { SECRET_KEY } from "@/backend/utils/config";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(SECRET_KEY);

export type AuthedUser = {
  id: string;
  username: string;
};

export type AuthResult =
  | { ok: true; user: AuthedUser }
  | { ok: false; response: Response };

/**
 * Verifies the Bearer token on a request and resolves the matching user.
 *
 * Call this at the top of every route handler that reads or changes
 * privileged data:
 *
 *   const auth = await requireAuth(request);
 *   if (!auth.ok) return auth.response;
 */
export const requireAuth = async (request: Request): Promise<AuthResult> => {
  const header = request.headers.get("Authorization");

  if (!header || !header.toLowerCase().startsWith("bearer ")) {
    return { ok: false, response: forbiddenResponse({ message: "Token Missing" }) };
  }

  const bearerToken = header.slice(7).trim();

  if (!bearerToken) {
    return { ok: false, response: forbiddenResponse({ message: "Token Missing" }) };
  }

  let payload: { id?: unknown; username?: unknown };

  try {
    ({ payload } = await jwtVerify(bearerToken, secret, { algorithms: ["HS256"] }));
  } catch {
    // Never echo the underlying jose error back to the caller.
    return { ok: false, response: unauthorizedResponse({ message: "Invalid Token" }) };
  }

  if (typeof payload?.username !== "string" || !payload.username) {
    return { ok: false, response: unauthorizedResponse({ message: "Invalid Token" }) };
  }

  const user = await getUser({ where: { username: payload.username } });

  if (!user || user.id !== payload.id) {
    return { ok: false, response: unauthorizedResponse({ message: "Unauthorized Access" }) };
  }

  return { ok: true, user: { id: user.id, username: user.username } };
};

export async function generateToken(payload: AuthedUser) {
  return await new SignJWT({ id: payload.id, username: payload.username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}
