import { createHash } from "node:crypto";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seed() {
  if (process.env.NODE_ENV === "production") throw new Error("O seed de demonstração é bloqueado em produção.");
  const [{ connectDb }, { lessons, modules }, { LearningModule, Lesson, Activity }, { Student }, { LessonProgress }] = await Promise.all([
    import("../src/lib/db/connect"), import("../src/content/curriculum"), import("../src/models/Learning"), import("../src/models/Student"), import("../src/models/Progress"),
  ]);
  await connectDb();
  const moduleIds = new Map<string, unknown>();
  for (const item of modules) {
    const doc = await LearningModule.findOneAndUpdate({ slug: item.id }, { title: item.title, description: item.description, order: item.order }, { upsert: true, returnDocument: "after" });
    moduleIds.set(item.id, doc._id);
  }
  for (const item of lessons) {
    const lesson = await Lesson.findOneAndUpdate({ slug: item.id }, { moduleId: moduleIds.get(item.moduleId), title: item.title, description: item.description, content: item.steps, order: item.order, version: 1 }, { upsert: true, returnDocument: "after" });
    for (const [order, activity] of item.activities.entries()) {
      await Activity.findOneAndUpdate({ key: activity.id }, { lessonId: lesson._id, type: activity.type, question: activity.question, options: activity.options ?? activity.pairs ?? activity.items, gradingConfig: { correctAnswer: activity.correctAnswer, points: activity.points }, order }, { upsert: true });
    }
  }
  const demos = [
    { key: "maria-demo", name: "Maria Silva [DEMO]", className: "2º Ano A", scores: [80, 90, 70] },
    { key: "joao-demo", name: "João Santos [DEMO]", className: "2º Ano B", scores: [70, 80] },
    { key: "ana-demo", name: "Ana Costa [DEMO]", className: "3º Ano A", scores: [90, 80, 85, 95] },
  ];
  for (const demo of demos) {
    const browserTokenHash = createHash("sha256").update(`ia-lab-${demo.key}`).digest("hex");
    const student = await Student.findOneAndUpdate({ browserTokenHash }, { name: demo.name, className: demo.className, isDemo: true }, { upsert: true, returnDocument: "after" });
    for (const [index, score] of demo.scores.entries()) await LessonProgress.findOneAndUpdate({ studentId: student._id, lessonId: lessons[index].id }, { currentStep: 8, completed: true, firstScore: score, bestScore: score, completedAt: new Date() }, { upsert: true });
  }
  console.log(`Seed concluído: ${modules.length} módulos, ${lessons.length} aulas e ${demos.length} participantes de demonstração.`);
  process.exit(0);
}

seed().catch((error) => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
