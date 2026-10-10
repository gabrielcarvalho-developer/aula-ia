"use client";

import { Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Point = { x:number; y:number; label:0|1; train:boolean };
const initial: Point[] = [{x:18,y:25,label:0,train:true},{x:27,y:38,label:0,train:true},{x:38,y:25,label:0,train:true},{x:62,y:68,label:1,train:true},{x:72,y:78,label:1,train:true},{x:82,y:63,label:1,train:true},{x:33,y:44,label:0,train:false},{x:68,y:58,label:1,train:false}];

export function ClassifierLab(){
  const points=initial; const [params,setParams]=useState({w1:0,w2:0,b:0}); const [epochs,setEpochs]=useState(0);
  function train(){const m={...params}; const selected=points.filter(p=>p.train); for(let e=0;e<12;e++){for(const p of selected){const guess=m.w1*(p.x/100)+m.w2*(p.y/100)+m.b>=0?1:0;const error=p.label-guess;m.w1+=.35*error*(p.x/100);m.w2+=.35*error*(p.y/100);m.b+=.35*error;}} setParams(m);setEpochs(v=>v+12)}
  const accuracy=useMemo(()=>{const test=points.filter(p=>!p.train);return test.length?Math.round(test.filter(p=>(params.w1*(p.x/100)+params.w2*(p.y/100)+params.b>=0?1:0)===p.label).length/test.length*100):0},[params,points]);
  const lineY=(x:number)=> params.w2===0?50:(-(params.w1*(x/100)+params.b)/params.w2)*100;
  return <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><div className="relative rounded-3xl border bg-[var(--surface-strong)] p-4"><svg viewBox="0 0 100 100" className="w-full" role="img" aria-label="Pontos de dois grupos e uma linha que aprende a separá-los"><rect width="100" height="100" rx="3" fill="transparent" stroke="var(--border)" strokeWidth=".5" />{epochs>0&&<line x1="0" y1={100-lineY(0)} x2="100" y2={100-lineY(100)} stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3 2"/>}{points.map((p,i)=><g key={i}><circle cx={p.x} cy={100-p.y} r="3.4" fill={p.label?"#06b6d4":"#8b5cf6"} stroke={p.train?"white":"#f59e0b"} strokeWidth={p.train?"1":"1.8"}/>{!p.train&&<circle cx={p.x} cy={100-p.y} r="5" fill="none" stroke="#f59e0b" strokeWidth=".6"/>}</g>)}</svg><p className="mt-2 text-center text-xs text-[var(--muted)]">Roxo e azul são os dois grupos. A linha aparece após o treino.</p></div><div className="space-y-3"><div className="rounded-2xl border bg-[var(--surface-strong)] p-4"><h3 className="font-extrabold">Aprender com exemplos</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Clique no botão. O programa tenta separar os pontos azuis dos roxos e corrige a linha quando erra.</p></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/40"><p className="text-2xl font-black">{epochs?"Pronto":"—"}</p><p className="text-xs text-[var(--muted)]">treinamento</p></div><div className="rounded-2xl bg-cyan-50 p-4 dark:bg-cyan-950/40"><p className="text-2xl font-black">{epochs?`${accuracy}%`:"—"}</p><p className="text-xs text-[var(--muted)]">acertos em pontos novos</p></div></div><Button className="w-full" onClick={train}><Play size={17}/> Treinar agora</Button><Button variant="ghost" className="w-full" onClick={()=>{setParams({w1:0,w2:0,b:0});setEpochs(0)}}><RotateCcw size={15}/> Reiniciar</Button></div></div>
}
