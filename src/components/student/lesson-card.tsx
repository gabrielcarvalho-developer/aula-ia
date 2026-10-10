import { ArrowRight, Check, Clock3, Play } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { formatScore } from "@/lib/utils";
import type { LessonDefinition } from "@/types/learning";

export function LessonCard({ lesson, progress }: { lesson: LessonDefinition; progress?: { currentStep: number; completed: boolean; bestScore: number | null } }) {
  const percentage = progress?.completed ? 100 : progress ? Math.round(((progress.currentStep + 1) / 9) * 100) : 0;
  return (
    <Link href={`/aprender/${lesson.id}`} className="group block rounded-3xl border bg-[var(--surface)] p-5 shadow-[0_12px_40px_rgba(20,20,40,.05)] transition hover:-translate-y-1 hover:border-[color:var(--primary)] hover:shadow-[0_20px_50px_rgba(80,55,180,.12)]">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl font-black text-white" style={{ background: lesson.color }}>{progress?.completed ? <Check size={21} /> : lesson.number}</div>
        <div className="min-w-0 flex-1"><p className="mb-1 text-xs font-bold uppercase tracking-[.16em] text-[var(--muted)]">Aula {lesson.number}</p><h3 className="text-lg font-extrabold tracking-tight group-hover:text-[var(--primary)]">{lesson.shortTitle}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{lesson.description}</p></div>
      </div>
      <div className="mt-5"><Progress value={percentage} /><div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]"><span className="flex items-center gap-1.5"><Clock3 size={14} /> {lesson.duration}</span>{progress?.completed ? <span className="font-bold text-emerald-600 dark:text-emerald-400">Nota {formatScore(progress.bestScore)}</span> : progress ? <span className="flex items-center gap-1 font-semibold text-[var(--primary)]"><Play size={13} /> Continuar</span> : <span className="flex items-center gap-1 font-semibold">Começar <ArrowRight size={13} /></span>}</div></div>
    </Link>
  );
}
