"use client";

import { Play, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sigmoid } from "@/lib/labs/math";

const edges = [[0,0],[0,1],[1,0],[1,1]] as const;

export function NetworkLab() {
  const [inputs, setInputs] = useState([.8,.3]);
  const [strength, setStrength] = useState(1);
  const weights = [.9,-.4,.5,1.1,.8,-.6].map((value) => value * strength);
  const [run, setRun] = useState(false);
  const [selected, setSelected] = useState("h1");
  const hidden = [sigmoid(inputs[0]*weights[0]+inputs[1]*weights[2]), sigmoid(inputs[0]*weights[1]+inputs[1]*weights[3])];
  const output = sigmoid(hidden[0]*weights[4]+hidden[1]*weights[5]);
  const positions = { i1:[45,55], i2:[45,155], h1:[180,70], h2:[180,140], o:[315,105] } as const;
  return <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
    <div className="rounded-3xl border bg-[var(--surface-strong)] p-3 sm:p-5"><svg viewBox="0 0 360 210" role="img" aria-label="Rede neural com duas entradas, dois neurônios ocultos e uma saída" className="w-full">
      {edges.map(([a,b],i)=><line key={i} x1={positions[`i${a+1}` as "i1"].at(0)} y1={positions[`i${a+1}` as "i1"].at(1)} x2={positions[`h${b+1}` as "h1"].at(0)} y2={positions[`h${b+1}` as "h1"].at(1)} stroke={weights[i]>=0?"#8b5cf6":"#f43f5e"} strokeWidth={1+Math.abs(weights[i])*2} opacity={run?.85:.35} />)}
      {[0,1].map((i)=><line key={`o${i}`} x1={positions[`h${i+1}` as "h1"].at(0)} y1={positions[`h${i+1}` as "h1"].at(1)} x2={positions.o[0]} y2={positions.o[1]} stroke={weights[i+4]>=0?"#06b6d4":"#f43f5e"} strokeWidth={1+Math.abs(weights[i+4])*2} opacity={run?.85:.35} />)}
      {Object.entries(positions).map(([id,[x,y]])=><g key={id} onClick={()=>setSelected(id)} className="cursor-pointer"><circle cx={x} cy={y} r="24" fill={selected===id?"#6d4aff":"var(--surface-strong)"} stroke={selected===id?"#6d4aff":"var(--border)"} strokeWidth="3"/><text x={x} y={y+4} textAnchor="middle" fontSize="12" fontWeight="700" fill={selected===id?"white":"var(--foreground)"}>{id.startsWith("i")?inputs[Number(id[1])-1].toFixed(1):id.startsWith("h")?(run?hidden[Number(id[1])-1].toFixed(2):"?"):(run?output.toFixed(2):"?")}</text></g>)}
      <text x="45" y="202" textAnchor="middle" fontSize="10" fill="var(--muted)">ENTRADA</text><text x="180" y="202" textAnchor="middle" fontSize="10" fill="var(--muted)">OCULTA</text><text x="315" y="202" textAnchor="middle" fontSize="10" fill="var(--muted)">SAÍDA</text>
    </svg></div>
    <div><div className="rounded-2xl border bg-[var(--surface-strong)] p-4"><p className="mb-4 text-sm font-bold">Informações que entram</p>{inputs.map((value,i)=><label key={i} className="mb-3 block text-xs text-[var(--muted)]">Pista {i+1}: {Math.round(value*100)}%<input className="range mt-1" type="range" min="0" max="1" step=".1" value={value} onChange={e=>{setRun(false);setInputs(inputs.map((v,j)=>j===i?Number(e.target.value):v))}} /></label>)}</div><div className="mt-3 rounded-2xl border bg-[var(--surface-strong)] p-4"><label className="block text-sm font-bold">Força das conexões: {Math.round(strength*100)}%<input className="range mt-3" type="range" min=".4" max="1.4" step=".1" value={strength} onChange={e=>{setRun(false);setStrength(Number(e.target.value))}} /></label><p className="mt-2 text-xs text-[var(--muted)]">Um controle muda todas as conexões para facilitar a experiência.</p></div><Button className="mt-4 w-full" onClick={()=>setRun(true)}><Play size={17} /> Passar pela rede</Button>{run&&<p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-[var(--primary)]"><Zap size={15}/> Resultado: {Math.round(output*100)}%</p>}</div>
  </div>;
}
