import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { depoimentos, PageHeader, CtaBand } from "../components/site/shared";

export const Route = createFileRoute("/depoimentos")({
  head: () => ({
    meta: [
      { title: "Clientes — Marketing 2.0" },
      {
        name: "description",
        content:
          "Depoimentos reais de quem já cresceu com a Marketing 2.0. Resultados em academias, clínicas e negócios locais.",
      },
      { property: "og:title", content: "Clientes — Marketing 2.0" },
      {
        property: "og:description",
        content: "O que dizem nossos clientes sobre a nossa metodologia.",
      },
    ],
  }),
  component: DepoimentosPage,
});

function DepoimentosPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PageHeader
            eyebrow="Quem já cresceu com a gente"
            title="O que dizem"
            highlight="nossos clientes"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {depoimentos.map((t) => (
              <figure key={t.name} className="glass rounded-2xl p-8 flex flex-col">
                <Award className="h-6 w-6 text-gold" />
                <div className="mt-4 text-gold text-sm tracking-widest">★★★★★</div>
                <blockquote className="mt-4 text-base leading-relaxed flex-1">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-border/60 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/5 text-gold font-display font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
