import { createFileRoute } from "@tanstack/react-router";
import { Check, Image } from "lucide-react";
import { quemSomos, mvv, PageHeader, CtaBand } from "../components/site/shared";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Marketing 2.0" },
      {
        name: "description",
        content:
          "Conheça a Marketing 2.0: atendimento próximo, estratégias baseadas em dados e uma equipe apaixonada por resultados.",
      },
      { property: "og:title", content: "Quem Somos — Marketing 2.0" },
      {
        property: "og:description",
        content: "O motor de crescimento do seu negócio: missão, visão e valores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuemSomosPage,
});

function QuemSomosPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PageHeader
            eyebrow="Quem somos"
            title="Marketing 2.0 |"
            highlight="O Motor de Crescimento do Seu Negócio"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl transition">
              <h2 className="font-display text-xl font-bold">{quemSomos.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70 whitespace-pre-line">
                {quemSomos.desc}
              </p>
            </div>
            <ul className="rounded-2xl border border-border bg-ink-2 p-8 space-y-4 hover:border-brd hover:shadow-xl transition">
              {quemSomos.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brd text-gold">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {mvv.map((m) => (
              <div
                key={m.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-7 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-xs uppercase tracking-[0.2em] text-gold">{m.label}</div>
                <h3 className="mt-2 font-display text-lg font-bold group-hover:text-brd transition">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed flex-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
