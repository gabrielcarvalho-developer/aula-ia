import { NextResponse } from "next/server";
import { STUDENT_COOKIE, studentCookieOptions } from "@/lib/security/student-session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDENT_COOKIE, "", { ...studentCookieOptions, maxAge: 0 });
  return response;
}
