import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  WhatsAppIcon,
  WHATSAPP,
  stats,
  clientLogos,
  CtaBand,
} from "../components/site/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketing 2.0 — Muito mais que uma agência" },
      {
        name: "description",
        content:
          "Agência especializada em mídias sociais e crescimento digital. Criatividade, dados e tráfego pago já incluso.",
      },
      { property: "og:title", content: "Marketing 2.0 — Muito mais que uma agência" },
      {
        property: "og:description",
        content: "Movimentação diária, ADS incluso e resultados reais para sua marca.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Agência especializada em mídias sociais
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-extrabold leading-[1.02]">
              Muito mais
              <br />
              que uma
              <br />
              <span className="gradient-gold">agência!</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Especializados em <b className="text-foreground">mídias sociais</b> e
              crescimento digital. Criatividade, dados e{" "}
              <b className="text-foreground">tráfego pago já incluso</b> para
              resultados reais.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-brd px-6 py-3.5 text-sm font-semibold text-cream hover:bg-brd-light transition brand-shadow"
              >
                Quero crescer agora
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:bg-white/5 transition"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-extrabold gradient-gold">
                    {s.num}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brd/40 via-transparent to-gold/20 blur-2xl" />
            <div className="relative glass rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                  <div className="font-display font-bold">Últimos 30 dias</div>
                </div>
                <span className="rounded-full bg-gold/15 text-gold text-[11px] font-semibold px-3 py-1">
                  ao vivo
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { name: "Instagram", pct: 82, color: "#E1306C" },
                  { name: "Facebook", pct: 54, color: "#1877F2" },
                  { name: "TikTok", pct: 67, color: "#FF0050" },
                  { name: "LinkedIn", pct: 38, color: "#C9A84C" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ background: c.color }}
                    />
                    <span className="text-sm w-24 shrink-0">{c.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${c.pct}%`, background: c.color }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-10 text-right">
                      {c.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-display font-bold text-lg">247k</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">alcance total</div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg gold-text">8,4%</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">engajamento</div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg">1,2k</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">seguidores</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-brd px-4 py-3 brand-shadow">
              <div className="font-display text-xl font-extrabold text-cream">+34,7%</div>
              <div className="text-[10px] text-cream/80 uppercase tracking-wider">conversão este mês</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGO STRIP */}
      <div className="border-y border-border/60 bg-ink-2/40 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground shrink-0">
            Marcas que crescem com a Marketing 2.0
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            {clientLogos.map((l) => (
              <span
                key={l}
                className="font-display text-base font-bold text-muted-foreground/70 hover:text-gold transition"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <CtaBand />
    </main>
  );
}
