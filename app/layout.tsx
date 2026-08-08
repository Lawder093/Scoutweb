import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escultismo Crítico Popular",
  description: "Una propuesta de educación popular para aprender, organizarnos y transformar el mundo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="paper-grain">{children}</body>
    </html>
  );
}
