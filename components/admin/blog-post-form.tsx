"use client";

import { FormEvent, useState } from "react";
import { Check, ImagePlus, Save, Send } from "lucide-react";

type FormState = { type: "idle" | "success" | "error"; message: string };
export type EditableBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  author_name: string | null;
  coverImageUrl: string | null;
  source_url: string | null;
  is_published: boolean;
};

export function BlogPostForm({ post, onSaved, onCancel }: { post?: EditableBlogPost | null; onSaved?: () => void; onCancel?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<FormState>({ type: "idle", message: "" });
  const isEditing = Boolean(post);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ type: "idle", message: "" });
    setIsLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === "draft") {
      formData.delete("publish");
      formData.append("publish", "false");
    }
    try {
      if (isEditing && post?.id) formData.set("id", post.id);
      const response = await fetch("/api/admin/blog", { method: isEditing ? "PATCH" : "POST", body: formData });
      const result = await response.json() as { message?: string; slug?: string };
      if (!response.ok) throw new Error(result.message ?? "No se pudo guardar la entrada.");
      if (!isEditing) form.reset();
      setState({ type: "success", message: result.message ?? "Entrada guardada correctamente." });
      onSaved?.();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "No se pudo guardar la entrada." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-bold text-ink md:col-span-2">Título<input required name="title" defaultValue={post?.title ?? ""} maxLength={180} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Título de la entrada" /></label>
        <label className="block text-sm font-bold text-ink">Categoría<input required name="category" defaultValue={post?.category ?? ""} maxLength={80} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Crónica, herramienta…" /></label>
        <label className="block text-sm font-bold text-ink">Slug <span className="font-normal text-ink/45">(opcional)</span><input name="slug" defaultValue={post?.slug ?? ""} maxLength={180} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="se-genera-automaticamente" /></label>
        <label className="block text-sm font-bold text-ink md:col-span-2">Resumen<textarea required name="excerpt" defaultValue={post?.excerpt ?? ""} maxLength={320} rows={3} className="focus-ring mt-2 w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-3 text-base leading-6 outline-none sm:text-sm" placeholder="Una breve descripción para las tarjetas del blog." /></label>
        <label className="block text-sm font-bold text-ink md:col-span-2">Contenido<textarea required name="body" defaultValue={post?.body ?? ""} rows={12} className="focus-ring mt-2 w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-3 text-base leading-7 outline-none sm:text-sm" placeholder="Escribe la entrada. Separa los párrafos con una línea en blanco." /></label>
        <label className="block text-sm font-bold text-ink">Autor <span className="font-normal text-ink/45">(opcional)</span><input name="authorName" defaultValue={post?.author_name ?? ""} maxLength={120} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="Nombre de quien firma" /></label>
        <label className="block text-sm font-bold text-ink">Etiquetas <span className="font-normal text-ink/45">(separadas por coma)</span><input name="tags" defaultValue={post?.tags.join(", ") ?? ""} maxLength={240} className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="educación, territorio" /></label>
        <label className="block text-sm font-bold text-ink md:col-span-2"><span className="inline-flex items-center gap-2"><ImagePlus size={16} /> Imagen de portada <span className="font-normal text-ink/45">(opcional)</span></span>{post?.coverImageUrl && <img src={post.coverImageUrl} alt="Portada actual" className="mt-3 h-36 w-full rounded-xl object-cover" />}<input name="coverImage" type="file" accept="image/jpeg,image/png,image/webp" className="focus-ring mt-2 block w-full rounded-xl border border-ink/15 bg-paper px-3 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-xs file:font-bold file:text-primary" /><span className="mt-2 block text-xs font-normal text-ink/45">JPG, PNG o WebP · máximo 5 MB. Al editar, deja vacío para conservar la imagen actual.</span></label>
        <label className="block text-sm font-bold text-ink md:col-span-2">Enlace original <span className="font-normal text-ink/45">(opcional)</span><input name="sourceUrl" defaultValue={post?.source_url ?? ""} type="url" className="focus-ring mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 text-base outline-none sm:text-sm" placeholder="https://…" /></label>
      </div>
      <label className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-mist p-4 text-sm leading-6 text-ink/75"><input type="hidden" name="publish" value="false" /><input name="publish" value="true" type="checkbox" defaultChecked={post?.is_published ?? false} className="mt-1 h-4 w-4 accent-primary" /> <span><strong className="text-ink">Publicar inmediatamente.</strong> Si lo dejas desmarcado, quedará como borrador y no será visible en el blog público.</span></label>
      {state.type !== "idle" && <p role="status" className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm leading-6 ${state.type === "success" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>{state.type === "success" ? <Check size={17} className="mt-0.5 shrink-0" /> : null}{state.message}</p>}
      <div className="flex flex-wrap gap-3"><button type="submit" name="saveAction" value="draft" disabled={isLoading} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/25 px-5 py-3.5 text-sm font-extrabold text-primary hover:bg-primary/10 disabled:cursor-wait disabled:opacity-60 sm:w-auto"><Save size={16} /> Guardar borrador y continuar después</button><button type="submit" name="saveAction" value="save" disabled={isLoading} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto"><Send size={16} /> {isLoading ? "Guardando…" : isEditing ? "Actualizar entrada" : "Guardar entrada"}</button>{isEditing && <button type="button" onClick={onCancel} className="focus-ring inline-flex w-full items-center justify-center rounded-full border border-ink/15 px-5 py-3.5 text-sm font-extrabold text-ink/70 hover:border-primary/40 hover:text-primary sm:w-auto">Cancelar edición</button>}</div>
    </form>
  );
}
