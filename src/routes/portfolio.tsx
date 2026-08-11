import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/shared";
import { WhatsAppIcon, WHATSAPP } from "@/components/site/shared";
import { listPortfolioSlidesPublic } from "@/lib/portfolio.functions";

type Slide = { id: string; media_type: "image" | "video"; url: string; poster: string | null; caption: string | null };

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
  loader: async () => {
    try {
      return { slides: (await listPortfolioSlidesPublic()) as Slide[] };
    } catch {
      return { slides: [] as Slide[] };
    }
  },
  component: PortfolioPage,
});

function PortfolioPage() {
  const { slides } = Route.useLoaderData();
  const items: Slide[] =
    slides.length > 0
      ? slides
      : SLIDES.map((url, i) => ({
          id: `static-${i}`,
          media_type: "image" as const,
          url,
          poster: null,
          caption: null,
        }));

  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const total = items.length;
  const current = items[Math.min(index, total - 1)];

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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        eyebrow="Portfólio"
        title="Conheça parte do"
        highlight="nosso trabalho"
        description="Cases, entregas e resultados que transformam marcas em líderes."
      />

      <div className="mt-16 space-y-12">
        {items.map((item, i) => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-ink-2">
              {item.media_type === "video" ? (
                <video
                  src={item.url}
                  poster={item.poster ?? undefined}
                  controls
                  playsInline
                  className="mx-auto block w-full h-auto max-h-[85vh] object-contain"
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.caption ?? `Portfólio Marketing 2.0 — página ${i + 1}`}
                  className="mx-auto block w-full h-auto max-h-[85vh] object-contain"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              )}
            </div>
            
            {item.caption && (
              <div className="bg-white p-6 border-t border-border/40">
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  {item.caption}
                </p>
              </div>
            )}
            
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                #{String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setFull(true);
              }}
              className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brd shadow-lg transition opacity-0 group-hover:opacity-100 hover:bg-gold hover:text-white"
              aria-label="Ver em tela cheia"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-muted-foreground mb-8">
          Pronto para ter resultados como esses na sua marca?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 rounded-full bg-brd px-8 py-4 text-sm font-semibold text-cream hover:bg-brd-light transition brand-shadow"
          >
            Quero crescer agora
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold hover:bg-black/5 transition"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {full && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
        >
          {current.media_type === "video" ? (
            <video
              key={`full-${current.id}`}
              src={current.url}
              poster={current.poster ?? undefined}
              controls
              autoPlay
              playsInline
              className="max-h-[92vh] w-auto max-w-full"
            />
          ) : (
            <img
              src={current.url}
              alt={current.caption ?? `Portfólio Marketing 2.0 — página ${index + 1} de ${total}`}
              className="max-h-[92vh] w-auto max-w-full"
            />
          )}

          <button
            type="button"
            onClick={closeFull}
            aria-label="Sair da tela cheia (Esc)"
            title="Sair da tela cheia (Esc)"
            className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-3 text-xs font-bold text-white transition hover:bg-[var(--gold)] hover:text-black"
          >
            <X className="h-5 w-5" /> Sair
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
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white">
            <span>
              {index + 1} / {total}
            </span>
            <span className="h-4 w-px bg-white/30" />
            <button
              type="button"
              onClick={closeFull}
              aria-label="Sair da tela cheia (Esc)"
              title="Sair da tela cheia (Esc)"
              className="inline-flex items-center gap-1 transition hover:text-[var(--gold)]"
            >
              <Minimize2 className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}