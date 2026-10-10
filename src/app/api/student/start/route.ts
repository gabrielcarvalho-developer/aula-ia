import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { createBrowserToken, hashBrowserToken, STUDENT_COOKIE, studentCookieOptions } from "@/lib/security/student-session";
import { studentSchema } from "@/lib/validation";
import { Student } from "@/models/Student";

export async function POST(request: Request) {
  try {
    const parsed = studentSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Confira o nome e a turma informados." }, { status: 400 });
    await connectDb();
    const token = createBrowserToken();
    const student = await Student.create({
      name: parsed.data.name.replace(/\s+/g, " "),
      className: parsed.data.className.replace(/\s+/g, " "),
      browserTokenHash: hashBrowserToken(token),
    });
    const response = NextResponse.json({ ok: true, student: { name: student.name, className: student.className } }, { status: 201 });
    response.cookies.set(STUDENT_COOKIE, token, studentCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: "Não foi possível iniciar agora. Tente novamente." }, { status: 500 });
  }
}
