"use client";

import { ArrowRight, FlaskConical, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function WelcomeForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/student/start", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: data.get("name"), className: data.get("className") }) });
    const json = await response.json() as { error?: string };
    if (!response.ok) { setError(json.error ?? "Não foi possível começar."); setLoading(false); return; }
    router.push("/aprender"); router.refresh();
  }
  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold">Seu nome</label>
        <input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Maria Silva" className="h-13 w-full rounded-2xl border bg-[var(--surface-strong)] px-4 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" />
      </div>
      <div>
        <label htmlFor="className" className="mb-2 block text-sm font-semibold">Sua turma</label>
        <input id="className" name="className" required minLength={2} maxLength={50} placeholder="2º Ano A" className="h-13 w-full rounded-2xl border bg-[var(--surface-strong)] px-4 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" />
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <LoaderCircle className="animate-spin" size={20} /> : <FlaskConical size={20} />} {loading ? "Preparando seu laboratório..." : "Começar a aprender"} {!loading && <ArrowRight size={19} />}</Button>
      <p className="text-center text-xs leading-relaxed text-[var(--muted)]">Sem conta e sem senha. Seu progresso fica ligado a este navegador.</p>
    </form>
  );
}
