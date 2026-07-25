import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2, X } from "lucide-react";
import { PageHeader } from "@/components/site/shared";
import { VideoGallery } from "@/components/site/portfolio-videos";
import { VIDEO_SLIDE_INDEX } from "@/lib/portfolio-videos";

import s01 from "@/assets/portfolio/slide-01.jpg.asset.json";
import s02 from "@/assets/portfolio/slide-02.jpg.asset.json";
import s03 from "@/assets/portfolio/slide-03.jpg.asset.json";
import s04 from "@/assets/portfolio/slide-04.jpg.asset.json";
import s05 from "@/assets/portfolio/slide-05.jpg.asset.json";
import s06 from "@/assets/portfolio/slide-06.jpg.asset.json";
import s07 from "@/assets/portfolio/slide-07.jpg.asset.json";
import s08 from "@/assets/portfolio/slide-08.jpg.asset.json";
import s09 from "@/assets/portfolio/slide-09.jpg.asset.json";
import s10 from "@/assets/portfolio/slide-10.jpg.asset.json";
import s11 from "@/assets/portfolio/slide-11.jpg.asset.json";
import s12 from "@/assets/portfolio/slide-12.jpg.asset.json";
import s13 from "@/assets/portfolio/slide-13.jpg.asset.json";
import s14 from "@/assets/portfolio/slide-14.jpg.asset.json";
import s15 from "@/assets/portfolio/slide-15.jpg.asset.json";
import s16 from "@/assets/portfolio/slide-16.jpg.asset.json";
import pdfAsset from "@/assets/portfolio/portfolio.pdf.asset.json";

const SLIDES = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14, s15, s16].map(
  (a) => a.url,
);

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — Marketing 2.0" },
      {
        name: "description",
        content:
          "Cases, entregas e resultados do Grupo Marketing 2.0 em uma apresentação completa de 16 páginas.",
      },
      { property: "og:title", content: "Portfólio — Marketing 2.0" },
      {
        property: "og:description",
        content:
          "Cases, entregas e resultados do Grupo Marketing 2.0 em uma apresentação completa de 16 páginas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const total = SLIDES.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  const openFull = useCallback(() => setFull(true), []);

  const closeFull = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setFull(false);
  }, []);

  // Entra em tela cheia nativa quando o overlay abre
  useEffect(() => {
    if (!full) return;
    const el = overlayRef.current;
    if (el && !document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    }
    const onFsChange = () => {
      if (!document.fullscreenElement) setFull(false);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [full]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") closeFull();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, closeFull]);


  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <PageHeader
        eyebrow="Portfólio"
        title="Nossos"
        highlight="cases e resultados"
        description="Conheça parte do nosso trabalho."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        {/* Visualizador */}
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[var(--brd)] shadow-2xl">
          {index === VIDEO_SLIDE_INDEX ? (
            <div className="min-h-[420px]">
              <VideoGallery />
            </div>
          ) : (
            <img
              src={SLIDES[index]}
              alt={`Portfólio Marketing 2.0 — página ${index + 1} de ${total}`}
              className="mx-auto block max-h-[78vh] w-auto max-w-full"
              loading={index === 0 ? "eager" : "lazy"}
            />
          )}


          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Página anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white transition hover:bg-[var(--gold)] hover:text-black"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima página"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white transition hover:bg-[var(--gold)] hover:text-black"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/60 px-4 py-2 text-xs font-bold text-white">
            <span>
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setFull(true)}
              aria-label="Ver em tela cheia"
              className="transition hover:text-[var(--gold)]"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Miniaturas + download */}
        <div className="flex flex-col gap-4">
          <a
            href={pdfAsset.url}
            download="Portfolio-Marketing-2.0.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-extrabold text-black transition hover:bg-[var(--brd)] hover:text-white"
          >
            <Download className="h-4 w-4" /> Baixar portfólio (PDF)
          </a>

          <div className="grid max-h-[64vh] grid-cols-4 gap-2 overflow-y-auto pr-1 lg:grid-cols-3">
            {SLIDES.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir para a página ${i + 1}`}
                className={`overflow-hidden rounded-lg border-2 transition ${
                  i === index
                    ? "border-[var(--gold)] opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt={`Miniatura da página ${i + 1}`} loading="lazy" className="block w-full" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {full && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
          {index === VIDEO_SLIDE_INDEX ? (
            <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-[var(--brd)]">
              <VideoGallery />
            </div>
          ) : (
            <img
              src={SLIDES[index]}
              alt={`Portfólio Marketing 2.0 — página ${index + 1} de ${total}`}
              className="max-h-[92vh] w-auto max-w-full"
            />
          )}

          <button
            type="button"
            onClick={() => setFull(false)}
            aria-label="Fechar tela cheia"
            className="absolute right-5 top-5 rounded-full bg-white/15 p-3 text-white transition hover:bg-[var(--gold)] hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Página anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white transition hover:bg-[var(--gold)] hover:text-black"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima página"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white transition hover:bg-[var(--gold)] hover:text-black"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white">
            {index + 1} / {total}
          </div>
        </div>
      )}
    </div>
  );
}
