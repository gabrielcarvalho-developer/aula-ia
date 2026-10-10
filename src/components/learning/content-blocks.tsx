import { CheckCircle2, Lightbulb, ListChecks, Quote, Sparkles } from "lucide-react";

export function TextBlock({ title, body, bullets }: { title: string; body: string; bullets?: string[] }) {
  return <div><h1 className="text-balance text-3xl font-black leading-tight tracking-[-.03em] sm:text-4xl">{title}</h1><p className="mt-5 text-lg leading-8 text-[var(--muted)]">{body}</p>{bullets&&<ul className="mt-6 grid gap-3">{bullets.map(item=><li key={item} className="flex gap-3 rounded-2xl border bg-[var(--surface-strong)] p-4 text-sm leading-6"><CheckCircle2 className="mt-0.5 shrink-0 text-[var(--primary)]" size={18}/>{item}</li>)}</ul>}</div>;
}

export function ConceptHighlight({ children }: { children: React.ReactNode }) {
  return <div className="mt-7 flex gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-5 text-violet-950 dark:border-violet-900 dark:bg-violet-950/45 dark:text-violet-100"><Lightbulb className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-300"/><p className="font-semibold leading-7">{children}</p></div>;
}

export function DiagramBlock({ title, body, highlight }: { title: string; body: string; highlight?: string }) {
  return <div><h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">{title}</h1><div className="mt-7 overflow-hidden rounded-3xl border bg-[var(--surface-strong)]"><div className="grid-noise relative flex min-h-52 items-center justify-center p-7"><div className="relative z-10 flex items-center gap-3 sm:gap-6"><span className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-xl">informação</span><span className="text-2xl text-[var(--muted)]">×</span><span className="rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-xl">influência</span><span className="text-2xl text-[var(--muted)]">→</span><span className="grid size-14 place-items-center rounded-full bg-[var(--foreground)] font-black text-[var(--background)]">Σ</span></div></div><div className="border-t p-5"><p className="leading-7 text-[var(--muted)]">{body}</p></div></div>{highlight&&<ConceptHighlight>{highlight}</ConceptHighlight>}</div>;
}

export function InteractiveLab({ title, body, children }: { title:string;body:string;children:React.ReactNode }) {
  return <div><div className="mb-6"><h1 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h1><p className="mt-3 leading-7 text-[var(--muted)]">{body}</p></div>{children}</div>;
}

export function FeedbackBlock({ correct, children }: { correct:boolean;children:React.ReactNode }) {
  return <div role="status" aria-live="polite" className={`mt-5 rounded-2xl border p-4 text-sm font-semibold leading-6 ${correct?"border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200":"border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"}`}>{children}</div>;
}

export function LessonSummary({ title, body, concepts }: { title:string;body:string;concepts:string[] }) {
  return <div><div className="mb-6 grid size-14 place-items-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"><Sparkles/></div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h1><p className="mt-4 text-lg leading-8 text-[var(--muted)]">{body}</p><div className="mt-7 rounded-3xl border bg-[var(--surface-strong)] p-5"><p className="mb-4 flex items-center gap-2 text-sm font-bold"><ListChecks size={18}/> Conceitos que você investigou</p><div className="flex flex-wrap gap-2">{concepts.map(concept=><span key={concept} className="rounded-full bg-[var(--primary)]/10 px-3 py-1.5 text-sm font-semibold text-[var(--primary)]">{concept}</span>)}</div></div><div className="mt-6 flex gap-3 text-sm italic leading-6 text-[var(--muted)]"><Quote className="shrink-0" size={18}/> Aprender IA é trocar a ideia de “mágica” por perguntas cada vez melhores.</div></div>;
}
