import Image from "next/image";
import { BookOpen, Flag, Shirt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StoreProduct } from "@/content/store/products";

const productIcons: Record<string, LucideIcon> = {
  Identidad: Flag,
  Vestimenta: Shirt,
  Materiales: BookOpen,
};

const toneClasses: Record<StoreProduct["tone"], { panel: string; icon: string; text: string }> = {
  primary: { panel: "bg-primary", icon: "bg-accent text-ink", text: "text-white" },
  secondary: { panel: "bg-secondary", icon: "bg-white text-secondary", text: "text-white" },
  accent: { panel: "bg-accent", icon: "bg-ink text-white", text: "text-ink" },
  ink: { panel: "bg-ink", icon: "bg-primary text-white", text: "text-white" },
};

type StoreProductVisualProps = {
  product: StoreProduct;
  variant?: "card" | "detail";
};

export function StoreProductVisual({ product, variant = "card" }: StoreProductVisualProps) {
  const isDetail = variant === "detail";
  const Icon = productIcons[product.category] ?? BookOpen;
  const colors = toneClasses[product.tone];

  if (product.image) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-mist ${isDetail ? "min-h-[480px] p-7 sm:min-h-[620px] sm:p-10" : "h-64 p-4 sm:h-72"}`}>
        <Image src={product.image} alt={product.imageAlt ?? product.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]" sizes={isDetail ? "(max-width: 1024px) 92vw, 520px" : "(max-width: 640px) 92vw, 50vw"} />
        <span className={`absolute rounded-full bg-ink px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white ${isDetail ? "right-7 top-7" : "right-5 top-5"}`}>Objeto físico</span>
      </div>
    );
  }

  return (
    <div className={`relative flex overflow-hidden ${isDetail ? "min-h-[480px] flex-col items-start justify-between p-8 sm:min-h-[620px] sm:p-10" : "h-48 items-end justify-between p-6"} ${colors.panel} ${colors.text}`}>
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/20" aria-hidden="true" />
      <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-white/15" aria-hidden="true" />
      <span className={`relative grid place-items-center rounded-2xl ${isDetail ? "h-24 w-24" : "h-14 w-14"} ${colors.icon}`}><Icon size={isDetail ? 46 : 25} strokeWidth={1.8} /></span>
      <span className="relative text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-65">Objeto físico</span>
    </div>
  );
}
