import { ArrowRight, BookOpen, CircleGauge, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LessonCard } from "@/components/student/lesson-card";
import { StudentHeader } from "@/components/student/student-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { lessons, modules } from "@/content/curriculum";
import { connectDb } from "@/lib/db/connect";
import { calculateOverallAverage } from "@/lib/grading";
import { getCurrentStudent } from "@/lib/security/student-session";
import { formatScore } from "@/lib/utils";
import { LessonProgress } from "@/models/Progress";

export const dynamic = "force-dynamic";

export default async function LearnDashboard() {
  const student = await getCurrentStudent();
  if (!student) redirect("/");
  await connectDb();
  const saved = await LessonProgress.find({ studentId: student._id }).sort({ updatedAt: -1 }).lean();
  const progressMap = new Map(saved.map((item) => [item.lessonId, { currentStep: item.currentStep, completed: item.completed, bestScore: item.bestScore ?? null }]));
  const completed = saved.filter((item) => item.completed);
  const overall = calculateOverallAverage(completed.flatMap((item) => typeof item.bestScore === "number" ? [item.bestScore] : []));
  const latest = saved[0] ? lessons.find((lesson) => lesson.id === saved[0].lessonId) : lessons[0];
  const courseProgress = Math.round((completed.length / lessons.length) * 100);
  return (
    <><StudentHeader name={student.name} className={student.className} />
      <main className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
        <section className="mb-10 grid gap-5 lg:grid-cols-[1.45fr_.55fr]">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#5b3ce8] via-[#704df0] to-[#079bb6] p-7 text-white sm:p-9">
            <div className="absolute right-0 top-0 size-64 translate-x-1/3 -translate-y-1/3 rounded-full border-[40px] border-white/8" />
            <div className="relative"><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/75"><Sparkles size={16} /> Olá, {student.name.split(" ")[0]}</p><h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">Toda grande ideia começa com uma boa pergunta.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/78">Continue investigando como máquinas transformam números, padrões e contexto em resultados.</p>{latest && <Link href={`/aprender/${latest.id}`} className="mt-7 inline-block"><Button size="lg" className="bg-white text-violet-800 shadow-xl hover:bg-violet-50">{saved.length ? "Continuar estudando" : "Começar primeira aula"}<ArrowRight size={18} /></Button></Link>}</div>
          </Card>
          <Card className="flex flex-col justify-between p-6">
            <div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"><Trophy size={21} /></span><span className="text-xs font-bold uppercase tracking-[.16em] text-[var(--muted)]">Visão geral</span></div>
            <div className="mt-8 grid grid-cols-2 gap-5"><div><p className="text-3xl font-black">{formatScore(overall)}</p><p className="mt-1 text-xs text-[var(--muted)]">Nota geral</p></div><div><p className="text-3xl font-black">{completed.length}<span className="text-base text-[var(--muted)]">/6</span></p><p className="mt-1 text-xs text-[var(--muted)]">Aulas concluídas</p></div></div>
            <div className="mt-6"><Progress value={courseProgress} /><p className="mt-2 text-xs text-[var(--muted)]">{courseProgress}% da jornada concluída</p></div>
          </Card>
        </section>

        <div className="mb-7 flex items-end justify-between"><div><p className="mb-1 flex items-center gap-2 text-sm font-bold text-[var(--primary)]"><BookOpen size={16} /> Sua jornada</p><h2 className="text-2xl font-black tracking-tight sm:text-3xl">Explore os módulos</h2></div><div className="hidden items-center gap-2 text-sm text-[var(--muted)] sm:flex"><CircleGauge size={17} /> Progresso salvo automaticamente</div></div>
        <div className="space-y-12">
          {modules.map((module) => <section key={module.id} aria-labelledby={module.id}><div className="mb-5 flex items-start gap-4"><div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--foreground)] text-sm font-black text-[var(--background)]">{module.order}</div><div><h2 id={module.id} className="text-xl font-extrabold tracking-tight">{module.title}</h2><p className="mt-1 text-sm text-[var(--muted)]">{module.description}</p></div></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{lessons.filter((lesson) => lesson.moduleId === module.id).map((lesson) => <LessonCard key={lesson.id} lesson={lesson} progress={progressMap.get(lesson.id)} />)}</div></section>)}
        </div>
      </main>
    </>
  );
}
