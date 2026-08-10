import { createFileRoute } from "@tanstack/react-router";
import { processo, PageHeader, CtaBand } from "../components/site/shared";

export const Route = createFileRoute("/processo")({
  head: () => ({
    meta: [
      { title: "Processo — Marketing 2.0" },
      {
        name: "description",
        content:
          "Do diagnóstico à otimização: as 4 etapas do nosso método para gerar resultado real.",
      },
      { property: "og:title", content: "Processo — Marketing 2.0" },
      {
        property: "og:description",
        content: "Diagnóstico, estratégia, execução e otimização — do primeiro contato ao resultado.",
      },
    ],
  }),
  component: ProcessoPage,
});

function ProcessoPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PageHeader
            eyebrow="Como trabalhamos"
            title="Do primeiro contato ao"
            highlight="resultado"
            description="Um método claro em quatro etapas para transformar sua presença digital."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processo.map((p) => (
              <div
                key={p.step}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="font-display text-5xl font-extrabold text-black group-hover:text-brd transition">
                    {p.step}
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                    <p.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold group-hover:text-brd transition">{p.title}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
