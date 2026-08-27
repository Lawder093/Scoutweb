import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { AdminTabs } from "./admin-tabs";
import { SignOutButton } from "./sign-out-button";

export function AdminShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-mist pb-20 pt-8 sm:pt-10"><div className="section-shell"><header className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-extrabold text-secondary hover:text-primary"><ArrowLeft size={16} /> Volver al sitio</Link><SignOutButton /></header><div className="mt-10"><span className="eyebrow text-primary"><ShieldCheck size={14} /> Panel de administración</span><h1 className="display-title mt-5 text-5xl leading-[0.9] sm:text-7xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-ink/65">{description}</p></div><AdminTabs /><section className="mt-7">{children}</section></div></main>;
}
