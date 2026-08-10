import { createFileRoute, Link } from "@tanstack/react-router";
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

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grupo.map((g) => (
              <Link
                key={g.name}
                to={g.to}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <g.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold group-hover:text-brd transition">{g.name}</h3>
                <p className="mt-2 text-[10px] font-bold text-foreground/70 uppercase tracking-widest group-hover:text-gold transition">
                  {g.tag}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
