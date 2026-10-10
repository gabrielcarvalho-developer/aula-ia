import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border bg-[var(--surface)] shadow-[0_18px_60px_rgba(22,22,40,.07)]", className)} {...props} />;
}
