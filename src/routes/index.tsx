import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  Camera,
  Check,
  Code2,
  Compass,
  Instagram,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Megaphone,
  Palette,
  PenTool,
  Phone,
  Printer,
  Repeat,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketing 2.0 — Muito mais que uma agência" },
      {
        name: "description",
        content:
          "Agência especializada em mídias sociais e crescimento digital. Criatividade, dados e tráfego pago já incluso para resultados reais.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "5511934503566";
const CONTACT_EMAIL = "contato@marketing2ponto0.com.br";
const WHATSAPP =
  "https://wa.me/5511934503566?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#25D366"
        d="M16.003 0C7.166 0 .01 7.156.01 15.993c0 2.82.74 5.575 2.146 8.003L0 32l8.2-2.148a15.94 15.94 0 0 0 7.803 1.99h.007c8.836 0 15.993-7.157 15.993-15.994 0-4.273-1.664-8.29-4.688-11.313A15.87 15.87 0 0 0 16.003 0Z"
      />
      <path
        fill="#FFFFFF"
        d="M23.44 19.02c-.4-.2-2.37-1.17-2.74-1.3-.37-.13-.64-.2-.9.2-.27.4-1.03 1.3-1.26 1.56-.23.27-.47.3-.87.1-.4-.2-1.69-.62-3.22-1.98-1.19-1.06-1.99-2.37-2.22-2.77-.23-.4-.02-.62.18-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.68l-.77-.01c-.27 0-.7.1-1.07.5-.37.4-1.4 1.37-1.4 3.34 0 1.97 1.43 3.87 1.63 4.14.2.27 2.82 4.3 6.83 6.03 2.38.94 3.32 1.02 4.51.86.73-.1 2.24-.92 2.55-1.8.32-.9.32-1.66.22-1.82-.1-.17-.37-.27-.77-.47Z"
      />
    </svg>
  );
}

const stats = [
  { num: "9+", label: "anos no mercado" },
  { num: "+30", label: "clientes ativos" },
  { num: "100k+", label: "leads captados" },
];

const clientLogos = [
  "Construmax",
  "RealFit",
  "Clínica Verdi",
  "GrãoCafé",
  "TecnoLog",
  "Moda Haus",
];

const diferenciais = [
  {
    icon: BarChart3,
    title: "Estratégia para criação de conteúdo",
    desc: "Planejamento editorial personalizado para cada marca e público-alvo.",
  },
  {
    icon: Megaphone,
    title: "Tráfego pago (ADS) já incluso",
    desc: "Google, Meta e TikTok Ads integrados — sem custo extra.",
  },
  {
    icon: Repeat,
    title: "Movimentação diária",
    desc: "Presença ativa e interações todos os dias da semana.",
  },
  {
    icon: PenTool,
    title: "Legendas com metodologia própria",
    desc: "Copywriting que prende o leitor e converte seguidores em clientes.",
  },
  {
    icon: MessageSquare,
    title: "Interagir via Direct",
    desc: "Gestão ativa de mensagens para fortalecer relacionamento.",
  },
  {
    icon: Search,
    title: "Análise de concorrência e tendências",
    desc: "Monitoramos o mercado para manter sua marca à frente.",
  },
];

const servicos = [
  {
    icon: Instagram,
    title: "Gestão de Redes Sociais",
    desc: "Instagram, Facebook, TikTok, Threads e LinkedIn. Conteúdo e movimentação diária para crescer de verdade.",
    badge: "Core service",
  },
  {
    icon: Megaphone,
    title: "Tráfego Pago (ADS)",
    desc: "Campanhas de alta performance no Google, Meta e TikTok. Já incluso no pacote — sem cobrar à parte.",
    badge: "Incluso",
  },
  {
    icon: Video,
    title: "Posts, Stories e Vídeos",
    desc: "Criação visual profissional: posts para feed, stories dinâmicos e vídeos para reels e TikTok.",
    badge: "Criação visual",
  },
  {
    icon: Palette,
    title: "Criação de Logos e Mascotes",
    desc: "Identidade visual com personalidade, logos, mascotes e peças para todos os canais.",
    badge: "Branding",
  },
  {
    icon: PenTool,
    title: "Copywriting Estratégico",
    desc: "Legendas com metodologia que prende o leitor e converte seguidores em clientes reais.",
    badge: "Conteúdo",
  },
  {
    icon: TrendingUp,
    title: "Análise e Relatórios",
    desc: "Relatórios mensais com métricas reais: alcance, engajamento, leads e ROI.",
    badge: "Inteligência",
  },
];

const processo = [
  {
    step: "01",
    icon: Compass,
    title: "Diagnóstico",
    desc: "Analisamos sua presença digital, concorrentes e oportunidades do mercado.",
  },
  {
    step: "02",
    icon: Layers,
    title: "Estratégia",
    desc: "Plano personalizado com canais, frequência, linha editorial e metas claras.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Execução",
    desc: "Criamos, publicamos e interagimos diariamente. ADS ativo desde o 1º mês.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Otimização",
    desc: "Monitoramos dados em tempo real e ajustamos para maximizar resultados.",
  },
];

const depoimentos = [
  {
    quote:
      "Em menos de 3 meses triplicamos a captação de alunos. A equipe move as redes todos os dias e os resultados são muito claros. Recomendo de olhos fechados.",
    name: "Marcos Ferreira",
    role: "Sócio — RealFit Academia",
    initials: "MF",
  },
  {
    quote:
      "O diferencial é a movimentação diária. Antes sumia depois de postar. Agora meu perfil está sempre ativo e clientes chegam pelo Instagram todo dia.",
    name: "Dra. Ana Verdi",
    role: "Diretora — Clínica Verdi",
    initials: "AV",
  },
  {
    quote:
      "O tráfego pago incluso foi decisivo. Pagamos um valor justo e o anúncio já veio junto. Em 6 meses o retorno foi de 7x. Resultado real, sem enrolação.",
    name: "Rafael Costa",
    role: "CEO — TecnoLog",
    initials: "RC",
  },
];

const grupo = [
  {
    name: "UP Fotos e Vídeos",
    tag: "Produção audiovisual",
    color: "from-pink-500/20 to-transparent",
    icon: Camera,
  },
  {
    name: "A3H Print",
    tag: "Comunicação impressa",
    color: "from-amber-500/20 to-transparent",
    icon: Printer,
  },
  {
    name: "Trinity Tecnologias",
    tag: "Sites e sistemas",
    color: "from-sky-500/20 to-transparent",
    icon: Code2,
  },
  {
    name: "Buskiache",
    tag: "Guia comercial + app",
    color: "from-emerald-500/20 to-transparent",
    icon: MapPin,
  },
];

const servicoOptions = [
  "Gestão de Redes Sociais",
  "Tráfego Pago (ADS)",
  "Criação de Conteúdo",
  "Branding & Logo",
  "Pacote completo",
  "Quero orientação",
];

function Index() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-ink/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brd to-brd-dark text-cream font-display font-extrabold brand-shadow">
              M
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display font-bold text-sm tracking-tight">
                Marketing <span className="gold-text">2.0</span>
              </span>
              <span className="text-[10px] italic text-muted-foreground">
                muito mais que uma agência
              </span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#diferencial" className="hover:text-foreground transition">Diferenciais</a>
            <a href="#servicos" className="hover:text-foreground transition">Serviços</a>
            <a href="#processo" className="hover:text-foreground transition">Processo</a>
            <a href="#grupo" className="hover:text-foreground transition">Grupo</a>
            <a href="#depoimentos" className="hover:text-foreground transition">Clientes</a>
          </nav>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full bg-brd px-5 py-2.5 text-sm font-semibold text-cream hover:bg-brd-light transition"
          >
            Falar agora
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
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
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full bg-brd px-6 py-3.5 text-sm font-semibold text-cream hover:bg-brd-light transition brand-shadow"
              >
                Quero crescer agora
                <ArrowRight className="h-4 w-4" />
              </a>
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

          {/* Hero visual — performance card */}
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

      {/* DIFERENCIAL */}
      <section id="diferencial" className="border-b border-border/60 py-24 bg-ink-2/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div className="lg:sticky lg:top-24">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                Nosso maior diferencial
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold">
                Diferente dos demais
                <br />
                que fazem <span className="gradient-gold">pacotes</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-md">
                Diferente dos demais que fazem pacotes por publicações,{" "}
                <b className="text-foreground">nós focamos na movimentação e engajamento</b>,
                movimentando diariamente e várias vezes por dia.
              </p>
              <p className="mt-4 text-muted-foreground max-w-md">
                Especializados em mídias sociais, focados em ampliar a presença online das marcas e criar{" "}
                <b className="text-foreground">conexões reais com seus públicos</b>.
              </p>
              <a
                href="#contato"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brd px-6 py-3 text-sm font-semibold text-cream hover:bg-brd-light transition"
              >
                Quero esse diferencial
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {diferenciais.map((d) => (
                <div
                  key={d.title}
                  className="glass rounded-2xl p-6 hover:border-gold/40 transition"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brd/25 text-gold">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                O que entregamos
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold max-w-xl">
                Soluções completas
                <br />
                para sua <span className="gradient-gold">marca</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xs md:text-right">
              Do planejamento ao resultado.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicos.map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-ink-2/60 p-7 hover:border-gold/40 transition flex flex-col"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-ink transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
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

      {/* PROCESSO */}
      <section id="processo" className="border-b border-border/60 py-24 bg-ink-2/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Como trabalhamos</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold">
              Do primeiro contato
              <br />
              ao <span className="gradient-gold">resultado</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processo.map((p) => (
              <div
                key={p.step}
                className="relative rounded-2xl border border-border/60 p-6 overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="font-display text-5xl font-extrabold text-brd/40">
                    {p.step}
                  </div>
                  <p.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRUPO */}
      <section id="grupo" className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">
              Grupo Marketing 2.0
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold">
              Um ecossistema <span className="gradient-gold">completo</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Quatro empresas que se conectam para entregar tudo que sua marca
              precisa — do post ao sistema.
            </p>
          </div>

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

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="border-b border-border/60 py-24 bg-ink-2/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Quem já cresceu com a gente</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold">
              O que dizem
              <br />
              <span className="gradient-gold">nossos clientes</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {depoimentos.map((t) => (
              <figure
                key={t.name}
                className="glass rounded-2xl p-8 flex flex-col"
              >
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

      {/* CTA BAND */}
      <section className="border-b border-border/60 py-16 bg-gradient-to-br from-brd via-brd-dark to-ink">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold">Pronto para crescer?</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-cream max-w-2xl">
              <span className="gradient-gold">Transforme suas redes</span> em canais de crescimento real
            </h2>
          </div>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-brd hover:bg-gold hover:text-ink transition brand-shadow shrink-0"
          >
            Quero uma proposta gratuita
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* CTA + CONTATO */}
      <section id="contato" className="border-b border-border/60 py-24">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">
              Fale com a gente
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold">
              Vamos conversar
              <br />
              sobre o seu <span className="gradient-gold">negócio</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Preencha o formulário e um especialista entrará em contato em até 24h com uma análise inicial gratuita.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border/60 p-4 hover:border-gold/40 transition"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brd/25 text-gold">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <div className="font-semibold">(11) 9.3450-3566</div>
                </div>
              </a>
              <a
                href="mailto:contato@marketing2ponto0.com.br"
                className="flex items-center gap-4 rounded-2xl border border-border/60 p-4 hover:border-gold/40 transition"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brd/25 text-gold">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">E-mail</div>
                  <div className="font-semibold">contato@marketing2ponto0.com.br</div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-border/60 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brd/25 text-gold">
                  <Instagram className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Redes sociais</div>
                  <div className="font-semibold">@marketing2ponto0</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border/60 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brd/25 text-gold">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Atendimento</div>
                  <div className="font-semibold">Seg a Sex · 9h às 18h</div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass rounded-2xl p-8 space-y-4"
          >
            {sent ? (
              <div className="text-center py-10">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">
                  Mensagem enviada!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Falaremos em breve.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Nome *
                    </span>
                    <input
                      required
                      className="mt-2 w-full rounded-lg border border-border/80 bg-ink/60 px-4 py-3 text-sm focus:border-gold focus:outline-none transition"
                      placeholder="Seu nome"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Empresa
                    </span>
                    <input
                      className="mt-2 w-full rounded-lg border border-border/80 bg-ink/60 px-4 py-3 text-sm focus:border-gold focus:outline-none transition"
                      placeholder="Sua empresa"
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      E-mail *
                    </span>
                    <input
                      type="email"
                      required
                      className="mt-2 w-full rounded-lg border border-border/80 bg-ink/60 px-4 py-3 text-sm focus:border-gold focus:outline-none transition"
                      placeholder="seu@email.com"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      WhatsApp
                    </span>
                    <input
                      className="mt-2 w-full rounded-lg border border-border/80 bg-ink/60 px-4 py-3 text-sm focus:border-gold focus:outline-none transition"
                      placeholder="(11) 9 XXXX-XXXX"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Serviço
                  </span>
                  <select
                    defaultValue=""
                    className="mt-2 w-full rounded-lg border border-border/80 bg-ink/60 px-4 py-3 text-sm focus:border-gold focus:outline-none transition"
                  >
                    <option value="" disabled>Selecione...</option>
                    {servicoOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Mensagem
                  </span>
                  <textarea
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-border/80 bg-ink/60 px-4 py-3 text-sm focus:border-gold focus:outline-none transition resize-none"
                    placeholder="Conte sobre seu negócio..."
                  />
                </label>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brd px-6 py-3.5 text-sm font-semibold text-cream hover:bg-brd-light transition brand-shadow"
                >
                  Enviar mensagem
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-brd text-cream text-xs font-bold">
              M
            </span>
            © {new Date().getFullYear()} Marketing 2.0. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#servicos" className="hover:text-foreground transition">Serviços</a>
            <a href="#grupo" className="hover:text-foreground transition">Grupo</a>
            <a href="#contato" className="hover:text-foreground transition">Contato</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-105 transition"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
