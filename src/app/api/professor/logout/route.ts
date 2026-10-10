import { NextResponse } from "next/server";
import { TEACHER_COOKIE, teacherCookieOptions } from "@/lib/security/teacher-session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(TEACHER_COOKIE, "", { ...teacherCookieOptions, maxAge: 0 });
  return response;
}
