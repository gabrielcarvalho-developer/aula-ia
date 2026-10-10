import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { createTeacherSession, safeKeyEquals, TEACHER_COOKIE, teacherCookieOptions } from "@/lib/security/teacher-session";
import { LoginThrottle } from "@/models/LoginThrottle";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function clientKey(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  return createHash("sha256").update(ip).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { key?: unknown };
    if (typeof body.key !== "string" || body.key.length > 256) return NextResponse.json({ error: "Chave inválida." }, { status: 400 });
    await connectDb();
    const key = clientKey(request);
    const now = new Date();
    const throttle = await LoginThrottle.findOne({ key });
    if (throttle?.blockedUntil && throttle.blockedUntil > now) return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });

    if (!safeKeyEquals(body.key)) {
      const windowExpired = !throttle || now.getTime() - throttle.windowStart.getTime() > WINDOW_MS;
      const count = windowExpired ? 1 : throttle.count + 1;
      await LoginThrottle.findOneAndUpdate(
        { key },
        { count, windowStart: windowExpired ? now : throttle?.windowStart ?? now, blockedUntil: count >= MAX_ATTEMPTS ? new Date(now.getTime() + WINDOW_MS) : null, expiresAt: new Date(now.getTime() + WINDOW_MS * 2) },
        { upsert: true }
      );
      return NextResponse.json({ error: "Chave de acesso incorreta." }, { status: 401 });
    }
    await LoginThrottle.deleteOne({ key });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(TEACHER_COOKIE, createTeacherSession(), teacherCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: "Não foi possível autenticar agora." }, { status: 500 });
  }
}
