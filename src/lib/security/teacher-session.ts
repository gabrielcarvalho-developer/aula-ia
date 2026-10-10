import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const TEACHER_COOKIE = "ialab_professor";
const SESSION_SECONDS = 60 * 60 * 8;

function secret() {
  const value = process.env.PROFESSOR_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("PROFESSOR_SESSION_SECRET deve ter ao menos 32 caracteres");
  return value;
}

function signature(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createTeacherSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_SECONDS * 1000 })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyTeacherSession(token?: string) {
  if (!token) return false;
  try {
    const [payload, provided] = token.split(".");
    if (!payload || !provided) return false;
    const expected = signature(payload);
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isTeacherAuthenticated() {
  return verifyTeacherSession((await cookies()).get(TEACHER_COOKIE)?.value);
}

export const teacherCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_SECONDS,
};

export function safeKeyEquals(input: string) {
  const expected = process.env.PROFESSOR_ACCESS_KEY;
  if (!expected) return false;
  const a = createHmac("sha256", secret()).update(input).digest();
  const b = createHmac("sha256", secret()).update(expected).digest();
  return timingSafeEqual(a, b);
}
