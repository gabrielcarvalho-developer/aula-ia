"use client";

import { ArrowDown, ArrowUp, Check, LoaderCircle, RotateCcw, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackBlock } from "./content-blocks";
import type { PublicActivity } from "@/types/learning";

type Result={isCorrect:boolean;feedback:string;score:number;completed:boolean};
type Props={lessonId:string;activity:PublicActivity;alreadyAttempted:boolean;onResult:(result:Result)=>void};

export function MultipleChoice({ options, value, onChange }: { options:string[];value:string;onChange:(value:string)=>void }) {
  return <div className="grid gap-3">{options.map((option,index)=><label key={option} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition hover:border-[var(--primary)] ${value===option?"border-[var(--primary)] bg-[var(--primary)]/7":"bg-[var(--surface-strong)]"}`}><input type="radio" className="sr-only" checked={value===option} onChange={()=>onChange(option)}/><span className={`grid size-8 shrink-0 place-items-center rounded-xl text-xs font-black ${value===option?"bg-[var(--primary)] text-white":"bg-[var(--background)] text-[var(--muted)]"}`}>{String.fromCharCode(65+index)}</span><span className="text-sm font-semibold leading-6">{option}</span>{value===option&&<Check className="ml-auto text-[var(--primary)]" size={18}/>}</label>)}</div>;
}

export function TrueFalse(props:{options:string[];value:string;onChange:(value:string)=>void}) { return <MultipleChoice {...props}/>; }

export function OrderingExercise({ value, onChange }: {items:string[];value:string[];onChange:(value:string[])=>void}) {
  function move(index:number,direction:-1|1){const next=[...value];const target=index+direction;if(target<0||target>=next.length)return;[next[index],next[target]]=[next[target],next[index]];onChange(next)}
  return <ol className="space-y-2">{value.map((item,index)=><li key={item} className="flex items-center gap-3 rounded-2xl border bg-[var(--surface-strong)] p-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--primary)]/10 text-xs font-black text-[var(--primary)]">{index+1}</span><span className="flex-1 text-sm font-semibold">{item}</span><Button type="button" variant="ghost" size="sm" aria-label={`Mover ${item} para cima`} disabled={index===0} onClick={()=>move(index,-1)}><ArrowUp size={15}/></Button><Button type="button" variant="ghost" size="sm" aria-label={`Mover ${item} para baixo`} disabled={index===value.length-1} onClick={()=>move(index,1)}><ArrowDown size={15}/></Button></li>)}</ol>;
}

export function MatchingExercise({ pairs, value, onChange }: {pairs:{left:string;right:string}[];value:Record<string,string>;onChange:(value:Record<string,string>)=>void}) {
  const rights=useMemo(()=>[...pairs.map(p=>p.right)].reverse(),[pairs]);
  return <div className="space-y-3">{pairs.map(pair=><label key={pair.left} className="grid gap-2 rounded-2xl border bg-[var(--surface-strong)] p-4 sm:grid-cols-2 sm:items-center"><span className="text-sm font-bold">{pair.left}</span><select value={value[pair.left]??""} onChange={e=>onChange({...value,[pair.left]:e.target.value})} className="h-10 rounded-xl border bg-[var(--background)] px-3 text-sm"><option value="">Selecione...</option>{rights.map(right=><option key={right}>{right}</option>)}</select></label>)}</div>;
}

export function ActivityCard({lessonId,activity,alreadyAttempted,onResult}:Props){
  const [answer,setAnswer]=useState<string>("");const [order,setOrder]=useState<string[]>(activity.items??[]);const [matches,setMatches]=useState<Record<string,string>>({});const [busy,setBusy]=useState(false);const [result,setResult]=useState<Result|null>(null);
  const finalAnswer=activity.type==="ordering"?order:activity.type==="matching"?(activity.pairs??[]).map(pair=>`${pair.left}::${matches[pair.left]??""}`):answer;
  const ready=Array.isArray(finalAnswer)?finalAnswer.length>0&&finalAnswer.every(Boolean):Boolean(finalAnswer);
  async function submit(){setBusy(true);const response=await fetch("/api/attempt",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({lessonId,activityId:activity.id,answer:finalAnswer,submissionId:crypto.randomUUID()})});const data=await response.json() as {error?:string;isCorrect?:boolean;feedback?:string;score?:number;completed?:boolean};const next:Result=response.ok?{isCorrect:Boolean(data.isCorrect),feedback:data.feedback??"Resposta registrada.",score:data.score??0,completed:Boolean(data.completed)}:{isCorrect:false,feedback:data.error??"Não foi possível enviar.",score:0,completed:false};setResult(next);setBusy(false);if(response.ok)onResult(next)}
  return <div><h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">{activity.question}</h1><p className="mb-6 mt-3 text-sm text-[var(--muted)]">Vale {activity.points} pontos · Você pode tentar novamente.</p>{activity.type==="multiple-choice"&&<MultipleChoice options={activity.options??[]} value={answer} onChange={setAnswer}/>} {activity.type==="true-false"&&<TrueFalse options={activity.options??[]} value={answer} onChange={setAnswer}/>} {activity.type==="ordering"&&<OrderingExercise items={activity.items??[]} value={order} onChange={setOrder}/>} {activity.type==="matching"&&<MatchingExercise pairs={activity.pairs??[]} value={matches} onChange={setMatches}/>}<div className="mt-6 flex flex-wrap gap-3"><Button onClick={submit} disabled={!ready||busy}>{busy?<LoaderCircle className="animate-spin" size={17}/>:<Send size={17}/>} Enviar resposta</Button>{(result||alreadyAttempted)&&<Button variant="ghost" onClick={()=>setResult(null)}><RotateCcw size={15}/> Tentar de novo</Button>}</div>{result&&<FeedbackBlock correct={result.isCorrect}>{result.feedback} {result.isCorrect&&`+${activity.points} pontos.`}</FeedbackBlock>}{alreadyAttempted&&!result&&<p className="mt-4 text-xs text-[var(--muted)]">Você já respondeu esta atividade. Uma nova tentativa pode melhorar sua nota.</p>}</div>
}
