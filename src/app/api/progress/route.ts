import { NextResponse } from "next/server";
import { getLesson } from "@/content/curriculum";
import { connectDb } from "@/lib/db/connect";
import { getCurrentStudent } from "@/lib/security/student-session";
import { progressSchema } from "@/lib/validation";
import { LessonProgress } from "@/models/Progress";

export async function PUT(request: Request) {
  try {
    const student = await getCurrentStudent();
    if (!student) return NextResponse.json({ error: "Participante não identificado." }, { status: 401 });
    const parsed = progressSchema.safeParse(await request.json());
    if (!parsed.success || !getLesson(parsed.data.lessonId)) return NextResponse.json({ error: "Progresso inválido." }, { status: 400 });
    await connectDb();
    const progress = await LessonProgress.findOneAndUpdate(
      { studentId: student._id, lessonId: parsed.data.lessonId },
      { $max: { currentStep: parsed.data.currentStep } },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean();
    return NextResponse.json({ ok: true, currentStep: progress.currentStep });
  } catch {
    return NextResponse.json({ error: "Não foi possível salvar o progresso." }, { status: 500 });
  }
}
