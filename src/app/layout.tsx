import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "IA Lab", template: "%s · IA Lab" },
  description: "Aprenda Inteligência Artificial por meio de experiências, desafios e descobertas.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('ialab-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>;
}
