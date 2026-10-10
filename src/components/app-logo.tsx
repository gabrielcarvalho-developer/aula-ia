import Link from "next/link";

export function AppLogo({ href = "/aprender" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center font-extrabold tracking-tight" aria-label="IA Lab — início">
      <span className="text-lg">IA <span className="text-[var(--primary)]">Lab</span></span>
    </Link>
  );
}
