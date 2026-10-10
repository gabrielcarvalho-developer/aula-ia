import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { calculateOverallAverage } from "@/lib/grading";
import { isTeacherAuthenticated } from "@/lib/security/teacher-session";
import { LessonProgress } from "@/models/Progress";
import { Student } from "@/models/Student";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: Request) {
  if (!(await isTeacherAuthenticated())) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().slice(0, 80) ?? "";
    const className = searchParams.get("class")?.trim().slice(0, 50) ?? "";
    const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";
    const query: Record<string, unknown> = { isDemo: { $ne: true } };
    if (search) query.name = { $regex: escapeRegex(search), $options: "i" };
    if (className) query.className = className;
    const students = await Student.find(query).select("name className").lean();
    const ids = students.map((student) => student._id);
    const progress = await LessonProgress.find({ studentId: { $in: ids }, completed: true }).select("studentId bestScore").lean();
    const scoreMap = new Map<string, number[]>();
    for (const item of progress) {
      const id = String(item.studentId);
      const list = scoreMap.get(id) ?? [];
      if (typeof item.bestScore === "number") list.push(item.bestScore);
      scoreMap.set(id, list);
    }
    const results = students.map((student) => ({ id: String(student._id), name: student.name, className: student.className, score: calculateOverallAverage(scoreMap.get(String(student._id)) ?? []) }));
    results.sort((a, b) => {
      if (a.score == null && b.score == null) return a.name.localeCompare(b.name, "pt-BR");
      if (a.score == null) return 1;
      if (b.score == null) return -1;
      return sort === "asc" ? a.score - b.score : b.score - a.score;
    });
    const classes = await Student.distinct("className", { isDemo: { $ne: true } });
    return NextResponse.json({ results, classes: classes.sort() });
  } catch {
    return NextResponse.json({ error: "Não foi possível consultar os resultados." }, { status: 500 });
  }
}
