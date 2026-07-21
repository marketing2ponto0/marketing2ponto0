import { createFileRoute } from "@tanstack/react-router";
import { grupo, PageHeader, CtaBand } from "../components/site/shared";

export const Route = createFileRoute("/grupo")({
  head: () => ({
    meta: [
      { title: "Grupo Marketing 2.0 — Ecossistema completo" },
      {
        name: "description",
        content:
          "UP Fotos, A3H Print, Trinity Tecnologias e Buskiache: um ecossistema completo para sua marca.",
      },
      { property: "og:title", content: "Grupo Marketing 2.0" },
      {
        property: "og:description",
        content: "Quatro empresas conectadas para entregar tudo o que sua marca precisa.",
      },
    ],
  }),
  component: GrupoPage,
});

function GrupoPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PageHeader
            eyebrow="Grupo Marketing 2.0"
            title="Um ecossistema"
            highlight="completo"
            description="Quatro empresas que se conectam para entregar tudo que sua marca precisa — do post ao sistema."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {grupo.map((g) => (
              <div
                key={g.name}
                className={`relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${g.color} p-6 hover:border-gold/40 transition`}
              >
                <g.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-6 font-display text-lg font-bold">{g.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                  {g.tag}
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
