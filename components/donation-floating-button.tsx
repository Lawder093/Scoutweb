import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export function DonationFloatingButton() {
  return (
    <Link
      href="/donacion"
      aria-label="Ir a la página de donación"
      className="focus-ring fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1 hover:bg-primary/90 sm:bottom-6 sm:left-6 sm:px-5"
    >
      <HeartHandshake size={18} aria-hidden="true" />
      <span>Donación</span>
    </Link>
  );
}
