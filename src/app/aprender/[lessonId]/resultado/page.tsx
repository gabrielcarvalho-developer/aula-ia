import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLesson, lessons } from "@/content/curriculum";
import { connectDb } from "@/lib/db/connect";
import { getCurrentStudent } from "@/lib/security/student-session";
import { formatScore } from "@/lib/utils";
import { LessonProgress } from "@/models/Progress";

export const dynamic = "force-dynamic";

export default async function ResultPage({params}:{params:Promise<{lessonId:string}>}){
  const student=await getCurrentStudent();if(!student)redirect("/");const {lessonId}=await params;const lesson=getLesson(lessonId);if(!lesson)notFound();await connectDb();const progress=await LessonProgress.findOne({studentId:student._id,lessonId}).lean();if(!progress?.completed)redirect(`/aprender/${lessonId}`);const next=lessons.find(item=>item.number===lesson.number+1);
  return <main className="grid min-h-screen place-items-center px-4 py-10"><Card className="w-full max-w-2xl overflow-hidden text-center"><div className="bg-gradient-to-br from-violet-600 to-cyan-600 px-6 py-10 text-white"><div className="mx-auto grid size-20 place-items-center rounded-full bg-white/15 ring-8 ring-white/8"><Trophy size={36}/></div><p className="mt-5 text-sm font-bold uppercase tracking-[.18em] text-white/70">Aula {lesson.number} concluída</p><h1 className="mt-2 text-3xl font-black tracking-tight">{lesson.shortTitle}</h1></div><div className="p-6 sm:p-9"><p className="text-sm text-[var(--muted)]">Sua melhor nota</p><p className="mt-1 text-7xl font-black tracking-tight text-[var(--primary)]">{formatScore(progress.bestScore)}</p>{progress.firstScore!==progress.bestScore&&<p className="mt-2 text-xs text-[var(--muted)]">Primeira tentativa: {formatScore(progress.firstScore)}</p>}<div className="my-7 rounded-3xl border bg-[var(--background)] p-5 text-left"><p className="mb-4 flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="text-emerald-500" size={18}/> O que você leva desta aula</p><div className="flex flex-wrap gap-2">{lesson.steps[8].kind==="summary"&&lesson.steps[8].concepts.map(item=><span key={item} className="rounded-full bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-semibold">{item}</span>)}</div></div><div className="flex flex-col justify-center gap-3 sm:flex-row"><Link href={`/aprender/${lessonId}`}><Button variant="secondary" className="w-full"><RotateCcw size={16}/> Revisar aula</Button></Link>{next?<Link href={`/aprender/${next.id}`}><Button className="w-full">Próxima aula <ArrowRight size={17}/></Button></Link>:<Link href="/aprender"><Button className="w-full">Voltar à jornada <ArrowLeft size={17}/></Button></Link>}</div></div></Card></main>
}
