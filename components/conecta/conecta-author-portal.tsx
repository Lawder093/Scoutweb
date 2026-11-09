"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { CheckCircle2, ImagePlus, LoaderCircle, LogOut, Mail, Shield, Upload } from "lucide-react";
import type { ConectaUser } from "@/lib/auth/conecta";

type State = { type: "idle" | "success" | "error"; message: string };
const countryNames: Record<string, string> = { mexico: "México", colombia: "Colombia", argentina: "Argentina" };

function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, 1400 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) { URL.revokeObjectURL(objectUrl); reject(new Error("No se pudo preparar la imagen.")); return; }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(objectUrl);
        if (!blob) { reject(new Error("No se pudo comprimir la imagen.")); return; }
        resolve(new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "postal"}.webp`, { type: "image/webp" }));
      }, "image/webp", 0.72);
    };
    image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("No se pudo leer la imagen.")); };
    image.src = objectUrl;
  });
}

function flagFor(country: string | null): string { return country === "mexico" ? "🇲🇽" : country === "colombia" ? "🇨🇴" : country === "argentina" ? "🇦🇷" : "🌎"; }

export function ConectaAuthorPortal({ user }: { user: ConectaUser }) {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<State>({ type: "idle", message: "" });
  const country = countryNames[user.cde_slug ?? ""] ?? user.cde_slug ?? "Tu país";

  function chooseImage(event: ChangeEvent<HTMLInputElement>) { setImage(event.target.files?.[0] ?? null); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!image) { setState({ type: "error", message: "Selecciona una foto para la portada." }); return; }
    setLoading(true); setState({ type: "idle", message: "" });
    try {
      const form = new FormData();
      form.set("message", message.trim());
      form.set("coverImage", await compressImage(image));
      const response = await fetch("/api/conecta/postcards", { method: "POST", body: form });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo enviar la postal.");
      setImage(null); setMessage("");
      const input = document.getElementById("postcard-cover") as HTMLInputElement | null;
      if (input) input.value = "";
      setState({ type: "success", message: result.message ?? "Postal enviada para aprobación." });
    } catch (error) { setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo enviar la postal." }); }
    finally { setLoading(false); }
  }

  async function logout() { await fetch("/api/conecta/auth/logout", { method: "POST" }); window.location.href = "/conecta"; }

  return <main className="min-h-screen bg-mist pb-24 pt-28"><section className="section-shell"><div className="flex flex-col gap-5 rounded-[2rem] bg-secondary px-6 py-7 text-white shadow-soft sm:flex-row sm:items-center sm:justify-between sm:px-9"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">Sesión de Conecta</p><h1 className="display-title mt-1 text-3xl">Hola, {user.name.split(" ")[0]}.</h1><p className="mt-1 text-sm text-white/75">{flagFor(user.cde_slug)} {country} · {user.community ?? "Grupo scout"}</p></div><button type="button" onClick={() => void logout()} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-xs font-extrabold text-white hover:border-white hover:bg-white/10"><LogOut size={15} /> Cerrar sesión</button></div><div className="mx-auto mt-12 max-w-2xl"><div className="mb-8"><span className="eyebrow text-secondary"><Shield size={14} /> Postal para la comunidad</span><h2 className="display-title mt-4 text-5xl leading-[0.92] sm:text-7xl">Estamos aquí,<br /><span className="text-secondary">conectados.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-ink/60">Comparte una imagen y un mensaje breve. Un administrador revisará tu postal antes de publicarla durante 72 horas.</p></div><div className="mb-7 flex items-center gap-4 rounded-2xl border border-secondary/20 bg-paper p-4 shadow-card">{user.photo_url ? <img src={user.photo_url} alt={`Logo de ${user.community ?? "tu grupo"}`} className="h-14 w-14 rounded-xl object-contain" /> : <div className="grid h-14 w-14 place-items-center rounded-xl bg-secondary/10 text-2xl">⚜</div>}<div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">Identidad asignada por administración</p><p className="mt-1 font-extrabold text-ink">{user.community ?? "Grupo scout"} · {country}</p><p className="mt-1 text-xs text-ink/50">Tu nombre aparecerá como {user.name}.</p></div></div><form onSubmit={submit} className="rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-card sm:p-8"><label className="block text-sm font-extrabold text-ink"><span className="inline-flex items-center gap-2"><ImagePlus size={16} /> Portada de la postal</span><input id="postcard-cover" required type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} className="focus-ring mt-2 block w-full rounded-xl border border-dashed border-ink/20 bg-mist/40 px-3 py-3 text-sm text-ink/65 file:mr-3 file:rounded-full file:border-0 file:bg-secondary/10 file:px-3 file:py-2 file:text-xs file:font-extrabold file:text-secondary" /><span className="mt-2 block text-xs font-normal text-ink/45">Se comprime automáticamente a WebP antes de subirla.</span>{image && <span className="mt-2 block text-xs text-secondary">{image.name}</span>}</label><label className="mt-6 block text-sm font-extrabold text-ink">Mensaje para la comunidad<textarea required value={message} onChange={(event) => setMessage(event.target.value.slice(0, 350))} maxLength={350} rows={6} className="focus-ring mt-2 w-full resize-y rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-base leading-7 outline-none" placeholder="Hey, estamos aquí trabajando…" /></label><p className="mt-2 text-right text-xs text-ink/45">{message.length}/350</p>{state.type !== "idle" && <p role={state.type === "error" ? "alert" : "status"} className={`mt-5 rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.type === "success" && <CheckCircle2 className="mr-2 inline-block" size={16} />}{state.message}</p>}<button type="submit" disabled={loading} className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-4 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{loading ? <LoaderCircle className="animate-spin" size={17} /> : <Upload size={17} />}{loading ? "Enviando…" : "Enviar postal para aprobación"}</button><p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-ink/45"><Mail size={14} /> Recibirás confirmación cuando la administración la revise.</p></form></div></section></main>;
}
