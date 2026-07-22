import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/shared";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — Marketing 2.0" },
      { name: "description", content: "Cases e resultados do Marketing 2.0 em uma apresentação interativa." },
      { property: "og:title", content: "Portfólio — Marketing 2.0" },
      { property: "og:description", content: "Cases e resultados do Marketing 2.0 em uma apresentação interativa." },
    ],
  }),
  component: PortfolioPage,
});

const CANVA_EMBED = "https://www.canva.com/design/DAGsgeq47Fc/FHH2KFpMwLUZYUOXV65gXw/view?embed";
const CANVA_LINK = "https://canva.link/kwoefphkt3uzu8l";

function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <PageHeader
        eyebrow="Portfólio"
        title="Nossos"
        highlight="cases e resultados"
        description="Apresentação interativa com projetos, entregas e números do Grupo Marketing 2.0."
      />
      <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={CANVA_EMBED}
            title="Apresentação Marketing 2.0"
            allow="fullscreen; clipboard-write"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white px-6 text-center">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gold)]">Portfólio Canva</p>
              <h2 className="mt-3 text-2xl font-black text-[var(--brd)] md:text-4xl">
                O Canva bloqueou a incorporação desta apresentação
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/70">
                O link atual abre em modo de edição/privado para iframe. Para aparecer completo aqui, preciso do código público de incorporação do Canva.
              </p>
              <a
                href={CANVA_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-extrabold text-black transition hover:bg-[var(--brd)] hover:text-white"
              >
                Abrir portfólio no Canva
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <a
          href={CANVA_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black hover:bg-black/10 transition"
        >
          Abrir em tela cheia
        </a>
      </div>
    </div>
  );
}
