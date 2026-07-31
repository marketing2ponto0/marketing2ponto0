import { createFileRoute } from "@tanstack/react-router";
import { servicos, PageHeader, CtaBand } from "../components/site/shared";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Marketing 2.0" },
      {
        name: "description",
        content:
          "Gestão de redes sociais, tráfego pago, criação visual, branding, copywriting e relatórios de performance.",
      },
      { property: "og:title", content: "Serviços — Marketing 2.0" },
      {
        property: "og:description",
        content: "Soluções completas para a sua marca, do planejamento ao resultado.",
      },
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PageHeader
            eyebrow="O que entregamos"
            title="Soluções completas para sua"
            highlight="marca"
            description="Do planejamento estratégico à execução diária: tudo o que sua marca precisa em um só lugar."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicos.map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-7 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold group-hover:text-brd transition">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {s.desc}
                </p>
                <span className="mt-5 self-start rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {s.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
