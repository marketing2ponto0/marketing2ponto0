import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { diferenciais, PageHeader, CtaBand } from "../components/site/shared";

export const Route = createFileRoute("/diferenciais")({
  head: () => ({
    meta: [
      { title: "Diferenciais — Marketing 2.0" },
      {
        name: "description",
        content:
          "Movimentação diária, ADS incluso e metodologia própria de copy. Conheça o que nos diferencia.",
      },
      { property: "og:title", content: "Diferenciais — Marketing 2.0" },
      {
        property: "og:description",
        content: "O que nos torna diferente das agências que só entregam pacotes.",
      },
    ],
  }),
  component: DiferenciaisPage,
});

function DiferenciaisPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PageHeader
            eyebrow="Nosso maior diferencial"
            title="Diferente dos demais que fazem"
            highlight="pacotes"
            description="Foco em movimentação e engajamento diário, com ADS incluso e conexões reais com o público."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((d) => (
              <div
                key={d.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <d.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold group-hover:text-brd transition">{d.title}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-full bg-brd px-6 py-3 text-sm font-semibold text-cream hover:bg-brd-light transition"
            >
              Quero esse diferencial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
