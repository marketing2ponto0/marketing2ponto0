import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award } from "lucide-react";
import {
  WhatsAppIcon,
  WHATSAPP,
  stats,
  clientLogos,
  mvv,
  diferenciais,
  servicos,
  processo,
  grupo,
  depoimentos,
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

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold">
        {eyebrow}
      </span>
      <h2 className="mt-6 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="gradient-gold">{highlight}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-5 text-lg text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

function SeeMore({ to, label }: { to: string; label: string }) {
  return (
    <div className="mt-10 text-center">
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-foreground transition"
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold">
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
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:bg-black/5 transition"
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
                    <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
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
              <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-brd-dark to-brd px-5 py-4 brand-shadow">
                <div className="text-[10px] text-cream/80 uppercase tracking-wider font-semibold">
                  Conversão este mês
                </div>
                <div className="font-display text-2xl font-extrabold text-cream">+72,5%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGO STRIP */}
      <div className="border-y border-border/60 bg-ink-2/40 py-8 group overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-bold text-center md:text-left">
            Marcas que crescem com a Marketing 2.0
          </p>
        </div>
        <div className="relative space-y-4">
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 gap-10 animate-marquee-left">
              {[...clientLogos.slice(0, 8), ...clientLogos.slice(0, 8)].map((l, i) => (
                <span
                  key={`row1-${l}-${i}`}
                  className="font-display text-base font-bold text-muted-foreground/70 hover:text-gold transition whitespace-nowrap"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 gap-10 animate-marquee-right">
              {[...clientLogos.slice(8), ...clientLogos.slice(8)].map((l, i) => (
                <span
                  key={`row2-${l}-${i}`}
                  className="font-display text-base font-bold text-muted-foreground/70 hover:text-gold transition whitespace-nowrap"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MISSÃO, VISÃO E VALORES */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Quem somos"
            title="Missão, visão e"
            highlight="valores"
            description="Marketing 2.0 | O Motor de Crescimento do Seu Negócio"
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {mvv.map((m) => (
              <div key={m.label} className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-7 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-xs uppercase tracking-[0.2em] text-gold">
                  {m.label}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold group-hover:text-brd transition">{m.title}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed whitespace-pre-line flex-1">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
          <SeeMore to="/quem-somos" label="Conheça quem somos" />
        </div>
      </section>


      {/* DIFERENCIAIS */}

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold uppercase tracking-wider">
                Nosso maior diferencial
              </span>
              <h2 className="mt-6 font-display text-4xl md:text-5xl font-extrabold leading-[1.05]">
                Diferente dos demais que fazem <span className="gradient-gold">pacotes</span>
              </h2>
              <div className="mt-8 space-y-6 text-lg text-muted-foreground">
                <p>
                  Diferente dos demais que fazem pacotes por publicações, <b className="text-foreground">nós focamos na movimentação e engajamento</b>, movimentando diariamente e várias vezes por dia!
                </p>
                <p>
                  Especializados em mídias sociais, focados em ampliar a presença online das marcas e criar <b className="text-foreground">conexões reais com seus públicos</b>.
                </p>
              </div>
              <div className="mt-10">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 rounded-full bg-brd px-8 py-4 text-sm font-semibold text-cream hover:bg-brd-light transition brand-shadow"
                >
                  Quero esse diferencial
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {diferenciais.map((d) => (
                <Link
                  key={d.title}
                  to="/diferenciais"
                  className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-6 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex items-start gap-5"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold group-hover:text-brd transition">{d.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <SeeMore to="/diferenciais" label="Ver todos os diferenciais" />
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="py-20 md:py-24 bg-ink-2/30 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="O que entregamos"
            title="Soluções completas para sua"
            highlight="marca"
            description="Do planejamento estratégico à execução diária: tudo o que sua marca precisa em um só lugar."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicos.map((s) => (
              <Link
                key={s.title}
                to="/servicos"
                className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-7 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground group-hover:text-brd transition">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed flex-1">
                  {s.desc}
                </p>
                <span className="mt-5 self-start rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brd group-hover:bg-gold group-hover:text-foreground group-hover:border-gold transition">
                  {s.badge}
                </span>
              </Link>
            ))}
          </div>
          <SeeMore to="/servicos" label="Ver todos os serviços" />
        </div>
      </section>

      {/* PROCESSO */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Como trabalhamos"
            title="Do primeiro contato ao"
            highlight="resultado"
            description="Um método claro em quatro etapas para transformar sua presença digital."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processo.map((p) => (
              <Link
                key={p.step}
                to="/processo"
                className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-7 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <div className="font-display text-5xl font-extrabold text-black group-hover:text-brd transition">
                    {p.step}
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                    <p.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold group-hover:text-brd transition">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed flex-1">
                  {p.desc}
                </p>
              </Link>
            ))}
          </div>
          <SeeMore to="/processo" label="Conhecer o processo" />
        </div>
      </section>

      {/* GRUPO */}
      <section className="py-20 md:py-24 bg-ink-2/30 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
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
                className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-6 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <g.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold group-hover:text-brd transition">{g.name}</h3>
                <p className="mt-1 text-xs text-foreground/70 uppercase tracking-wider">
                  {g.tag}
                </p>
              </Link>
            ))}
          </div>
          <SeeMore to="/grupo" label="Conhecer o grupo" />
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Quem já cresceu com a gente"
            title="O que dizem"
            highlight="nossos clientes"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {depoimentos.map((t) => (
              <Link
                key={t.name}
                to="/depoimentos"
                className="group relative overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <Award className="h-5 w-5" />
                </div>
                <div className="mt-4 text-gold text-sm tracking-widest">★★★★★</div>
                <blockquote className="mt-4 text-base leading-relaxed flex-1 text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <div className="mt-6 pt-6 border-t border-border/60 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/5 text-gold font-display font-bold text-sm group-hover:bg-gold group-hover:text-foreground transition">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-brd transition">{t.name}</div>
                    <div className="text-xs text-foreground/70">{t.role}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <SeeMore to="/depoimentos" label="Ver todos os depoimentos" />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
