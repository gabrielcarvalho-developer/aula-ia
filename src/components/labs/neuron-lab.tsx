"use client";

import { RotateCcw, Sigma } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sigmoid } from "@/lib/labs/math";

const labels = ["Está chovendo", "Tenho tempo", "O compromisso é importante"];

export function NeuronLab() {
  const [inputs, setInputs] = useState([0.8, 0.4, 0.9]);
  const [weights, setWeights] = useState([-1.2, -0.4, 1.8]);
  const sum = inputs.reduce((total, value, i) => total + value * weights[i], 0);
  const output = sigmoid(sum);
  const update = (setter: typeof setInputs, values: number[], index: number, value: number) => setter(values.map((current, i) => i === index ? value : current));
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_.82fr]">
      <div className="space-y-4">{labels.map((label, i) => <div key={label} className="rounded-2xl border bg-[var(--surface-strong)] p-4"><div className="mb-3 flex items-center justify-between"><span className="font-bold">{label}</span><span className="rounded-lg bg-violet-50 px-2 py-1 text-xs font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">efeito {(inputs[i] * weights[i]).toFixed(1)}</span></div><label className="mb-1 flex justify-between text-xs text-[var(--muted)]"><span>Quanto isso acontece?</span><output>{inputs[i].toFixed(1)}</output></label><input className="range" type="range" min="0" max="1" step="0.1" value={inputs[i]} onChange={(e) => update(setInputs, inputs, i, Number(e.target.value))} /><label className="mb-1 mt-3 flex justify-between text-xs text-[var(--muted)]"><span>Quanto isso influencia?</span><output>{weights[i].toFixed(1)}</output></label><input className="range" type="range" min="-2" max="2" step="0.1" value={weights[i]} onChange={(e) => update(setWeights, weights, i, Number(e.target.value))} /></div>)}</div>
      <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-7 text-white">
        <div className="grid size-20 place-items-center rounded-full border-2 border-white/25 bg-white/12 shadow-2xl"><Sigma size={30} /></div><p className="mt-5 text-sm text-white/70">Combinação das pistas</p><p className="text-4xl font-black">{sum.toFixed(1)}</p><div className="my-4 h-6 w-px bg-white/25" /><p className="text-sm text-white/70">Força da decisão</p><p className="text-5xl font-black">{Math.round(output * 100)}%</p><p className="mt-4 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">{output >= .5 ? "Decisão: sair" : "Decisão: ficar"}</p><Button variant="ghost" size="sm" className="mt-5 text-white hover:bg-white/10 hover:text-white" onClick={() => { setInputs([.8,.4,.9]); setWeights([-1.2,-.4,1.8]); }}><RotateCcw size={15} /> Reiniciar</Button>
      </div>
    </div>
  );
}
