"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, Cloud, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ActivityCard } from "./activity";
import { ConceptHighlight, DiagramBlock, InteractiveLab as LabFrame, LessonSummary, TextBlock } from "./content-blocks";
import { InteractiveLab } from "@/components/labs/interactive-lab";
import type { PublicLesson } from "@/types/learning";

type SaveState="idle"|"saving"|"saved"|"error";

export function LessonReader({lesson,initialStep,attemptedIds,initialCompleted}:{lesson:PublicLesson;initialStep:number;attemptedIds:string[];initialCompleted:boolean}){
  const [step,setStep]=useState(Math.min(initialStep,8));const [direction,setDirection]=useState(1);const [saveState,setSaveState]=useState<SaveState>("idle");const [attempted,setAttempted]=useState(new Set(attemptedIds));const [completed,setCompleted]=useState(initialCompleted);
  const current=lesson.steps[step];const activity=current.kind==="activity"?lesson.activities.find(item=>item.id===current.activityId):undefined;
  const canAdvance=current.kind!=="activity"||(activity&&attempted.has(activity.id));
  async function persist(next:number){setSaveState("saving");try{const r=await fetch("/api/progress",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({lessonId:lesson.id,currentStep:next})});setSaveState(r.ok?"saved":"error")}catch{setSaveState("error")}}
  function go(next:number){if(next<0||next>8)return;setDirection(next>step?1:-1);setStep(next);if(next>step)void persist(next)}
  const label=useMemo(()=>({situation:"Situação inicial",explanation:"Explicação",visual:"Exemplo visual",activity:"Atividade",lab:"Laboratório",summary:"Resumo"}[current.kind]),[current.kind]);
  return <div className="min-h-screen"><header className="sticky top-0 z-40 border-b bg-[color:var(--surface)] backdrop-blur-xl"><div className="mx-auto flex h-18 max-w-6xl items-center gap-4 px-4 sm:px-6"><Link href="/aprender" className="grid size-10 shrink-0 place-items-center rounded-xl hover:bg-[var(--surface-strong)]" aria-label="Voltar ao painel"><ChevronLeft/></Link><div className="min-w-0 flex-1"><div className="mb-2 flex items-center justify-between gap-4"><p className="truncate text-xs font-bold sm:text-sm">Aula {lesson.number} · {lesson.shortTitle}</p><span className="flex shrink-0 items-center gap-1.5 text-[11px] text-[var(--muted)]">{saveState==="saving"?<><LoaderCircle className="animate-spin" size={13}/> Salvando</>:saveState==="saved"?<><CheckCircle2 size={13}/> Salvo</>:saveState==="error"?<><Cloud size={13}/> Sem conexão</>:null}</span></div><Progress value={((step+1)/9)*100} label={`Etapa ${step+1} de 9`}/></div><span className="hidden text-xs font-semibold text-[var(--muted)] sm:block">{step+1}/9</span></div></header>
    <main className="mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-12"><div className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-[var(--primary)]"><span className="size-2 rounded-full bg-[var(--primary)]"/>{current.eyebrow} · {label}</div><AnimatePresence mode="wait" initial={false}><motion.section key={step} initial={{opacity:0,x:direction*22}} animate={{opacity:1,x:0}} exit={{opacity:0,x:direction*-16}} transition={{duration:.22}} className="min-h-[440px] rounded-[2rem] border bg-[var(--surface)] p-6 shadow-[0_20px_70px_rgba(22,22,44,.07)] sm:p-10">
      {(current.kind==="situation"||current.kind==="explanation")&&<><TextBlock title={current.title} body={current.body} bullets={current.bullets}/>{current.highlight&&<ConceptHighlight>{current.highlight}</ConceptHighlight>}</>}
      {current.kind==="visual"&&<DiagramBlock title={current.title} body={current.body} highlight={current.highlight}/>} 
      {current.kind==="lab"&&<LabFrame title={current.title} body={current.body}><InteractiveLab type={current.lab}/></LabFrame>}
      {current.kind==="activity"&&activity&&<ActivityCard lessonId={lesson.id} activity={activity} alreadyAttempted={attempted.has(activity.id)} onResult={result=>{setAttempted(previous=>new Set(previous).add(activity.id));if(result.completed)setCompleted(true)}}/>}
      {current.kind==="summary"&&<LessonSummary title={current.title} body={current.body} concepts={current.concepts}/>} 
    </motion.section></AnimatePresence>
    <nav className="mt-6 flex items-center justify-between gap-3" aria-label="Navegação da aula"><Button variant="secondary" onClick={()=>go(step-1)} disabled={step===0}><ArrowLeft size={17}/><span className="hidden sm:inline">Anterior</span></Button><div className="hidden gap-1.5 md:flex">{lesson.steps.map((_,i)=><button key={i} onClick={()=>go(i)} aria-label={`Ir para etapa ${i+1}`} className={`size-2 rounded-full transition-all ${i===step?"w-6 bg-[var(--primary)]":i<step?"bg-[var(--primary)]/45":"bg-black/12 dark:bg-white/15"}`}/>)}</div>{step<8?<Button onClick={()=>go(step+1)} disabled={!canAdvance}>Próxima <ArrowRight size={17}/></Button>:completed?<Link href={`/aprender/${lesson.id}/resultado`}><Button>Ver meu resultado <CheckCircle2 size={17}/></Button></Link>:<Button onClick={()=>go(3)}>Concluir atividades <ArrowRight size={17}/></Button>}</nav>{!canAdvance&&<p className="mt-3 text-right text-xs text-[var(--muted)]">Envie uma resposta para continuar.</p>}</main>
  </div>
}
