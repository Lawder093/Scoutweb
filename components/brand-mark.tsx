import Image from "next/image";

type BrandMarkProps = {
  size?: number;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
};

export function BrandMark({ size = 48, className = "", decorative = false, priority = false }: BrandMarkProps) {
  return (
    <Image
      src="/images/ccep-elotl-mark.png"
      alt={decorative ? "" : "Emblema flor de lis-elotl de la Comunidad Crítica de Escultismo Popular"}
      aria-hidden={decorative || undefined}
      width={173}
      height={192}
      priority={priority}
      className={`object-contain ${className}`}
      style={{ width: size, height: "auto" }}
    />
  );
}
