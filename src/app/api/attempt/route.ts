import { NextResponse } from "next/server";
import { getActivity, getLesson } from "@/content/curriculum";
import { connectDb } from "@/lib/db/connect";
import { calculateLessonScore, gradeAnswer } from "@/lib/grading";
import { getCurrentStudent } from "@/lib/security/student-session";
import { attemptSchema } from "@/lib/validation";
import { ActivityAttempt, LessonProgress } from "@/models/Progress";

async function lessonResult(studentId: unknown, lessonId: string) {
  const best = await ActivityAttempt.aggregate<{ _id: string; score: number }>([
    { $match: { studentId, lessonId } },
    { $group: { _id: "$activityId", score: { $max: "$score" } } },
  ]);
  const lesson = getLesson(lessonId);
  const attempted = new Set(best.map((row) => row._id));
  const completed = Boolean(lesson && lesson.activities.every((activity) => attempted.has(activity.id)));
  return { score: calculateLessonScore(best.map((row) => row.score)), completed };
}

export async function POST(request: Request) {
  try {
    const student = await getCurrentStudent();
    if (!student) return NextResponse.json({ error: "Participante não identificado." }, { status: 401 });
    const parsed = attemptSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Resposta inválida." }, { status: 400 });
    const activity = getActivity(parsed.data.lessonId, parsed.data.activityId);
    if (!activity) return NextResponse.json({ error: "Atividade não encontrada." }, { status: 404 });
    await connectDb();

    const existing = await ActivityAttempt.findOne({ studentId: student._id, submissionId: parsed.data.submissionId }).lean();
    if (existing) {
      const result = await lessonResult(student._id, parsed.data.lessonId);
      return NextResponse.json({ ok: true, duplicated: true, isCorrect: existing.isCorrect, earned: existing.score, feedback: existing.isCorrect ? activity.feedbackCorrect : activity.feedbackIncorrect, ...result });
    }

    const isCorrect = gradeAnswer(parsed.data.answer, activity.correctAnswer);
    const attemptNumber = (await ActivityAttempt.countDocuments({ studentId: student._id, lessonId: parsed.data.lessonId, activityId: activity.id })) + 1;
    try {
      await ActivityAttempt.create({
        studentId: student._id,
        lessonId: parsed.data.lessonId,
        activityId: activity.id,
        answer: parsed.data.answer,
        isCorrect,
        score: isCorrect ? activity.points : 0,
        attemptNumber,
        submissionId: parsed.data.submissionId,
      });
    } catch (error) {
      if (!(error instanceof Error) || !("code" in error) || (error as Error & { code?: number }).code !== 11000) throw error;
    }

    const result = await lessonResult(student._id, parsed.data.lessonId);
    const now = new Date();
    const progress = await LessonProgress.findOne({ studentId: student._id, lessonId: parsed.data.lessonId });
    if (!progress) {
      await LessonProgress.create({ studentId: student._id, lessonId: parsed.data.lessonId, currentStep: result.completed ? 8 : 0, completed: result.completed, firstScore: result.completed ? result.score : null, bestScore: result.completed ? result.score : null, completedAt: result.completed ? now : null });
    } else {
      if (result.completed && !progress.completed) {
        progress.completed = true;
        progress.firstScore = result.score;
        progress.completedAt = now;
      }
      if (result.completed) progress.bestScore = Math.max(progress.bestScore ?? 0, result.score);
      await progress.save();
    }
    return NextResponse.json({ ok: true, isCorrect, earned: isCorrect ? activity.points : 0, feedback: isCorrect ? activity.feedbackCorrect : activity.feedbackIncorrect, ...result });
  } catch {
    return NextResponse.json({ error: "Não foi possível registrar a resposta." }, { status: 500 });
  }
}
