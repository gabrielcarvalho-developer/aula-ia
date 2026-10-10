import { AppLogo } from "@/components/app-logo";
import { SwitchStudent } from "@/components/student/switch-student";
import { ThemeToggle } from "@/components/theme-toggle";

export function StudentHeader({ name, className }: { name: string; className: string }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-[color:var(--surface)] backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <AppLogo />
        <div className="flex items-center gap-1">
          <div className="mr-2 hidden text-right sm:block"><p className="text-sm font-semibold leading-tight">{name}</p><p className="text-xs text-[var(--muted)]">{className}</p></div>
          <ThemeToggle /><SwitchStudent />
        </div>
      </div>
    </header>
  );
}
