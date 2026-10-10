"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SwitchStudent() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return <Button variant="ghost" size="sm" disabled={busy} onClick={async () => { setBusy(true); await fetch("/api/student/switch", { method: "POST" }); router.push("/"); router.refresh(); }}><LogOut size={16} /> Trocar aluno</Button>;
}
