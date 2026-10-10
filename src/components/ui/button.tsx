import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg" };

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition enabled:active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-55",
        variant === "primary" && "bg-[var(--primary)] text-white shadow-[0_10px_30px_rgba(109,74,255,.25)] hover:bg-[var(--primary-dark)]",
        variant === "secondary" && "border bg-[var(--surface-strong)] text-[var(--foreground)] hover:border-[var(--primary)]",
        variant === "ghost" && "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]",
        variant === "danger" && "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-14 px-7 text-base",
        className
      )}
      {...props}
    />
  );
}
