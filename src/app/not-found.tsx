import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound(){return <main className="grid min-h-screen place-items-center px-4 text-center"><div><p className="text-7xl font-black text-[var(--primary)]">404</p><h1 className="mt-3 text-2xl font-black">Essa experiência não existe.</h1><p className="mt-2 text-[var(--muted)]">Volte ao laboratório para continuar aprendendo.</p><Link href="/aprender" className="mt-6 inline-block"><Button>Voltar ao IA Lab</Button></Link></div></main>}
