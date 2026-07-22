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
const CANVA_LINK = "https://www.canva.com/design/DAGsgeq47Fc/FHH2KFpMwLUZYUOXV65gXw/view";

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
