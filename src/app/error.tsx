"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="grid min-h-screen place-items-center px-4 text-center"><div className="max-w-md"><AlertTriangle className="mx-auto text-amber-500" size={44}/><h1 className="mt-4 text-2xl font-black">Algo não saiu como esperado.</h1><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Verifique a conexão e a configuração do MongoDB. Seu progresso já confirmado continua seguro.</p><Button className="mt-6" onClick={reset}>Tentar novamente</Button></div></main>}
