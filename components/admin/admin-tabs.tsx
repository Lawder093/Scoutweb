"use client";

import { BookOpenText, CalendarPlus, Instagram, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminTabsPermissions = { blog: boolean; conecta: boolean; activities: boolean; instagram: boolean; canManageUsers: boolean; isOwner: boolean };

const tabs = [
  { href: "/admin/blog", label: "Escribir en blog", icon: BookOpenText, permission: "blog" },
  { href: "/admin/conecta", label: "Usuarios de Conecta", icon: UsersRound, permission: "conecta" },
  { href: "/admin/actividades", label: "Publicar evento", icon: CalendarPlus, permission: "activities" },
  { href: "/admin/instagram", label: "Instagram de los CDE", icon: Instagram, permission: "instagram" },
  { href: "/admin/usuarios", label: "Usuarios del panel", icon: UsersRound, permission: "canManageUsers" },
] as const;

export function AdminTabs({ permissions }: { permissions: AdminTabsPermissions }) {
  const pathname = usePathname();
  return <nav aria-label="Secciones del panel editorial" className="mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"><div className="flex min-w-max gap-2 rounded-2xl border border-ink/10 bg-paper p-2 shadow-card">{tabs.filter(({ permission }) => permissions[permission]).map(({ href, label, icon: Icon }) => { const active = pathname === href || pathname.startsWith(`${href}/`); return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${active ? "bg-primary text-white" : "text-ink/60 hover:bg-primary/10 hover:text-primary"}`}><Icon size={16} aria-hidden="true" />{label}</Link>; })}</div></nav>;
}
