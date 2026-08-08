import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHomeButton() {
  return <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-full text-sm font-bold text-ink/65 transition-colors hover:text-primary"><ArrowLeft size={17} /> Volver al sitio principal</Link>;
}
