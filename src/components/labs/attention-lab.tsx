"use client";

import { Info, Network } from "lucide-react";
import { useMemo, useState } from "react";

const examples=[
  {text:"O cachorro correu atrás da bola porque ela rolou", focus:"ela", links:{"bola":.92,"rolou":.78,"porque":.42,"cachorro":.18,"atrás":.12,"O":.03,"correu":.08,"da":.06,"ela":.1}},
  {text:"A professora guardou o livro depois que terminou a leitura", focus:"terminou", links:{"professora":.68,"leitura":.74,"livro":.49,"depois":.34,"A":.04,"guardou":.15,"o":.03,"que":.22,"a":.02,"terminou":.1}},
];

export function AttentionLab(){
  const [example,setExample]=useState(0);const tokens=examples[example].text.split(" ");const [selected,setSelected]=useState(examples[0].focus);
  const weights=useMemo(()=>tokens.map((token,i)=>({token,value:selected===examples[example].focus?(examples[example].links[token as keyof typeof examples[0]["links"]]??.05):Math.max(.05,1-Math.abs(tokens.indexOf(selected)-i)*.18)})).sort((a,b)=>b.value-a.value),[example,selected,tokens]);
  function change(index:number){setExample(index);setSelected(examples[index].focus)}
  return <div className="grid gap-6 lg:grid-cols-[1fr_.8fr]"><div className="rounded-3xl border bg-[var(--surface-strong)] p-5"><div className="mb-5 flex gap-2">{examples.map((_,i)=><button key={i} onClick={()=>change(i)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${example===i?"bg-[var(--primary)] text-white":"bg-[var(--background)] text-[var(--muted)]"}`}>Frase {i+1}</button>)}</div><p className="mb-4 text-xs text-[var(--muted)]">Clique em uma palavra:</p><div className="flex flex-wrap gap-2">{tokens.map((token,i)=><button key={`${token}-${i}`} onClick={()=>setSelected(token)} className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${selected===token?"border-[var(--primary)] bg-[var(--primary)] text-white shadow-lg":"bg-[var(--background)] hover:border-[var(--primary)]"}`}>{token}</button>)}</div><div className="mt-7 flex items-center gap-3 rounded-2xl bg-violet-50 p-4 text-sm text-violet-900 dark:bg-violet-950/40 dark:text-violet-200"><Network className="shrink-0"/> A palavra escolhida foi <strong>“{selected}”</strong></div></div><div className="rounded-3xl border bg-[var(--surface-strong)] p-5"><h3 className="font-extrabold">Palavras mais relacionadas</h3><p className="mb-5 mt-1 text-xs text-[var(--muted)]">Barras maiores indicam relações mais fortes neste exemplo.</p><div className="space-y-3">{weights.slice(0,5).map(({token,value})=><div key={token}><div className="mb-1 flex justify-between text-xs"><span>{token}</span><span>{Math.round(value*100)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[var(--background)]"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-[width]" style={{width:`${value*100}%`}}/></div></div>)}</div><p className="mt-5 flex gap-2 rounded-xl border p-3 text-xs leading-5 text-[var(--muted)]"><Info size={16} className="shrink-0"/> É apenas um exemplo para aprender. Essas barras não medem consciência.</p></div></div>
}
