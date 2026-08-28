import { ExternalLink, FileText } from "lucide-react";

type PdfReaderProps = {
  title: string;
  url: string;
};

export function PdfReader({ title, url }: PdfReaderProps) {
  const viewerUrl = `${url}#page=1&view=FitH`;

  return (
    <section id="lector-pdf" className="mt-16 scroll-mt-24" aria-labelledby="lector-pdf-title">
      <div className="flex flex-col gap-5 rounded-t-[1.6rem] bg-ink px-5 py-6 text-paper sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <span className="eyebrow text-accent">Lectura en línea</span>
          <h2 id="lector-pdf-title" className="display-title mt-3 text-4xl leading-none sm:text-5xl">
            Leer el PDF
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-paper/70">
            Navega por las páginas y usa los controles del visor para ajustar el zoom o descargar una copia.
          </p>
        </div>
        <a
          href={viewerUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-sm font-bold text-paper transition-colors hover:border-paper/60 hover:bg-paper/10"
        >
          Abrir en otra pestaña <ExternalLink size={16} />
        </a>
      </div>

      <div className="overflow-hidden rounded-b-[1.6rem] border border-t-0 border-ink/10 bg-white shadow-card">
        <iframe
          src={viewerUrl}
          title={`Lector PDF: ${title}`}
          className="block h-[72vh] min-h-[520px] w-full sm:h-[78vh] sm:min-h-[700px]"
        />
      </div>

      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-ink/55">
        <FileText size={15} className="mt-0.5 shrink-0 text-secondary" />
        Si tu navegador no muestra el visor dentro de la página, usa “Abrir en otra pestaña” para leerlo con el lector PDF del dispositivo.
      </p>
    </section>
  );
}
