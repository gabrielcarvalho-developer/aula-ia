import { ArrowDown, BrainCircuit, CheckCircle2, Network } from "lucide-react";
import { redirect } from "next/navigation";
import { AppLogo } from "@/components/app-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { WelcomeForm } from "@/components/student/welcome-form";
import { getCurrentStudent } from "@/lib/security/student-session";

export const dynamic = "force-dynamic";

export default async function Home() {
  try { if (await getCurrentStudent()) redirect("/aprender"); } catch { /* Form will expose a friendly connection error on submit. */ }
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-70" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6"><AppLogo href="/" /><ThemeToggle /></header>
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-8 lg:grid-cols-[1.08fr_.92fr] lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--primary)]"><span className="size-2 animate-pulse rounded-full bg-cyan-500" /> Laboratório de ideias</div>
          <h1 className="text-balance text-5xl font-black leading-[1.03] tracking-[-.045em] sm:text-6xl lg:text-7xl">Entenda a IA.<br /><span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">Mexendo nela.</span></h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-8 text-[var(--muted)]">Aprenda como a Inteligência Artificial funciona por meio de experiências, desafios e descobertas.</p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" /> 6 aulas interativas</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" /> Sem cadastro</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" /> Progresso automático</span>
          </div>
          <ArrowDown className="mt-12 hidden text-[var(--muted)] lg:block" />
        </div>
        <Card className="relative overflow-hidden p-6 sm:p-9">
          <div className="absolute -right-16 -top-16 size-40 rounded-full bg-violet-500/15 blur-2xl" />
          <div className="relative mb-7">
            <div className="mb-5 flex gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"><BrainCircuit /></span><span className="grid size-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300"><Network /></span></div>
            <h2 className="text-2xl font-extrabold tracking-tight">Bem-vindo ao IA Lab!</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Para guardar seu progresso, precisamos só destas duas informações.</p>
          </div>
          <WelcomeForm />
        </Card>
      </section>
    </main>
  );
}
