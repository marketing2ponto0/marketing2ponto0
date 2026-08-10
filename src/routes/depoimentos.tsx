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
              <figure key={t.name} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <Award className="h-5 w-5" />
                </div>
                <div className="mt-6 text-gold text-sm tracking-widest">★★★★★</div>
                <blockquote className="mt-4 text-base leading-relaxed flex-1 text-foreground/90 italic">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8 pt-8 border-t border-border/60 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 bg-gold/5 text-gold font-display font-bold text-sm group-hover:bg-gold group-hover:text-foreground transition">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold group-hover:text-brd transition">{t.name}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">{t.role}</div>
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
