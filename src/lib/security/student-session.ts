import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { connectDb } from "@/lib/db/connect";
import { Student } from "@/models/Student";

export const STUDENT_COOKIE = "ialab_participant";

export function createBrowserToken() {
  return randomBytes(32).toString("base64url");
}

export function hashBrowserToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function getCurrentStudent() {
  const token = (await cookies()).get(STUDENT_COOKIE)?.value;
  if (!token || token.length < 32) return null;
  await connectDb();
  return Student.findOne({ browserTokenHash: hashBrowserToken(token), isDemo: { $ne: true } }).lean();
}

export const studentCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 180,
};
