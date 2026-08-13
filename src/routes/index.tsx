import { createFileRoute, Link } from "@tanstack/react-router";
// Pelo admin criar a opção de mexer em cada campo, foto, texto e vídeos, separador por tópicos criar admin pelo www.marketing2ponto0.com.br/admin
import { useSuspenseQuery } from "@tanstack/react-query";
import { listPortfolioSlidesPublic } from "../lib/portfolio.functions";
import { ArrowRight, Award, Check, Play } from "lucide-react";
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
  quemSomos,
} from "../components/site/shared";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData({
    queryKey: ["portfolio-slides-public"],
    queryFn: () => listPortfolioSlidesPublic(),
  }),
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
  const { data: slides } = useSuspenseQuery({
    queryKey: ["portfolio-slides-public"],
    queryFn: () => listPortfolioSlidesPublic(),
  });

  const videoSlides = slides.filter(s => s.media_type === "video");
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
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:bg-black/5 transition"
              >
                Ver Portfólio
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:bg-black/5 transition"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
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
              <Link 
                to="/contato"
                className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-brd-dark to-brd px-5 py-4 brand-shadow hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <div className="text-[10px] text-cream/80 uppercase tracking-wider font-semibold">
                  Conversão este mês
                </div>
                <div className="font-display text-2xl font-extrabold text-cream">+72,5%</div>
              </Link>
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
              <div key={m.label} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  {m.label}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold group-hover:text-brd transition">{m.title}</h3>
                <p className="mt-4 text-sm text-foreground/70 leading-relaxed whitespace-pre-line flex-1">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl border border-border bg-ink-2 p-8 md:p-10 hover:border-brd hover:shadow-xl transition">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold">{quemSomos.title}</h2>
                <p className="mt-6 text-base leading-relaxed text-foreground/70 whitespace-pre-line">
                  {quemSomos.desc}
                </p>
              </div>
              <ul className="space-y-4">
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
          </div>
        </div>
      </section>


      {/* DIFERENCIAIS */}

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <span className="text-gold font-bold text-xs uppercase tracking-[0.2em]">
                Nosso maior diferencial
              </span>
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground">
                Diferente dos demais <br /> que fazem pacotes
              </h2>
              <div className="mt-8 space-y-6 text-base text-foreground/80 leading-relaxed max-w-lg">
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

            <div className="space-y-3">
              {diferenciais.map((d) => (
                <div
                  key={d.title}
                  className="group relative flex items-center gap-4 rounded-xl border border-border bg-ink-2 p-5 hover:border-brd/50 transition-all duration-300"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brd rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brd/10 text-brd group-hover:bg-brd group-hover:text-cream transition-colors">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-bold text-foreground">
                      {d.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/60 line-clamp-1 group-hover:line-clamp-none transition-all">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              <div
                key={s.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-foreground group-hover:text-brd transition">{s.title}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  {s.desc}
                </p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {s.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5 text-xs text-foreground/70">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border/60">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brd group-hover:bg-gold group-hover:text-foreground group-hover:border-gold transition">
                    {s.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
          <div className="mt-14 grid gap-8 lg:grid-cols-4">
            {processo.map((p, idx) => (
              <div key={p.step} className="relative">
                {idx < processo.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-brd/40 to-transparent z-0" />
                )}
                <div className="group relative z-10 flex flex-col items-center text-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-ink-2 border border-border shadow-lg group-hover:border-brd group-hover:shadow-brd/20 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brd to-brd-dark opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative font-display text-4xl font-black text-brd group-hover:text-gold transition-colors">
                      {p.step}
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-bold group-hover:text-brd transition-colors">{p.title}</h3>
                    <p className="mt-4 text-sm text-foreground/70 leading-relaxed max-w-[240px]">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-6 grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-brd group-hover:bg-brd group-hover:text-gold transition-all">
                    <p.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
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
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grupo.map((g) => (
              <div
                key={g.name}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${g.color} p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition`}
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brd text-gold shadow-lg">
                    <g.icon className="h-6 w-6" />
                  </div>
                  <Link 
                    to={g.to}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brd hover:text-gold transition"
                  >
                    Detalhes <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                
                <h3 className="mt-8 font-display text-xl font-bold text-foreground group-hover:text-brd transition">
                  {g.name}
                </h3>
                <p className="mt-2 text-[10px] font-bold text-foreground/70 uppercase tracking-widest group-hover:text-gold transition">
                  {g.tag}
                </p>
                
                <p className="mt-6 text-sm leading-relaxed text-foreground/80 flex-1">
                  {g.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {g.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs text-foreground/70">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {"site" in g && g.site ? (
                  <div className="mt-8">
                    <a
                      href={g.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brd/10 border border-brd/20 py-3 text-[10px] font-bold uppercase tracking-wider text-brd hover:bg-brd hover:text-cream transition"
                    >
                      Acessar Plataforma
                    </a>
                  </div>
                ) : (
                  <div className="mt-8">
                    <Link
                      to="/contato"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brd py-3 text-[10px] font-bold uppercase tracking-wider text-cream hover:bg-brd-light transition shadow-md"
                    >
                      Solicitar Orçamento
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          
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
              <div
                key={t.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                  <Award className="h-5 w-5" />
                </div>
                <div className="mt-6 text-gold text-sm tracking-widest">★★★★★</div>
                <blockquote className="mt-4 text-base leading-relaxed flex-1 text-foreground/90 italic">
                  "{t.quote}"
                </blockquote>
                <div className="mt-8 pt-8 border-t border-border/60 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 bg-gold/5 text-gold font-display font-bold text-sm group-hover:bg-gold group-hover:text-foreground transition">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold group-hover:text-brd transition">{t.name}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* SEÇÃO DE VÍDEOS (PORTFÓLIO) */}
      {videoSlides.length > 0 && (
        <section className="py-20 md:py-24 bg-ink-2/30 border-y border-border/60">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Nosso Portfólio"
              title="Resultados em"
              highlight="movimento"
              description="Confira alguns dos nossos trabalhos e resultados gerados para nossos clientes."
            />
            
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videoSlides.map((video) => (
                <div 
                  key={video.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 hover:border-brd hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <video
                      src={video.url}
                      poster={video.poster || undefined}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      controls
                      preload="none"
                      playsInline
                      muted
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                      <div className="h-16 w-16 rounded-full bg-brd/90 text-gold flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold group-hover:text-brd transition">
                      {video.caption?.split('\n')[0] || "Vídeo de Portfólio"}
                    </h3>
                    {video.caption?.includes('\n') && (
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                        {video.caption.split('\n').slice(1).join('\n')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-brd px-8 py-4 text-sm font-semibold text-brd hover:bg-brd hover:text-cream transition shadow-sm"
              >
                Ver portfólio completo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </main>
  );
}
