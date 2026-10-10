"use client";

import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  function toggle() {
    const dark = document.documentElement.classList.contains("dark");
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ialab-theme", next ? "dark" : "light");
  }
  return <Button variant="ghost" size="sm" onClick={toggle} aria-label="Alternar modo claro ou escuro"><Moon size={18} /></Button>;
}
