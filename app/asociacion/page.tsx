import type { Metadata } from "next";
import { FoundationPage } from "@/components/foundation-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "La asociación",
  description: "Conoce la misión, visión, líneas de trabajo, historia y compromisos de la Comunidad Crítica de Escultismo Popular, A. C.",
  path: "/asociacion",
});

export default function AsociacionPage() {
  return <FoundationPage />;
}
