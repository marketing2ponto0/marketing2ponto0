import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Megaphone,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  {
    icon: Target,
    title: "Estratégia de aquisição",
    desc: "Diagnóstico completo, posicionamento e roadmap de canais orientado a receita.",
  },
  {
    icon: Megaphone,
    title: "Mídia paga performance",
    desc: "Google, Meta, TikTok e LinkedIn com atribuição real e otimização diária.",
  },
  {
    icon: Bot,
    title: "IA aplicada ao marketing",
    desc: "Automação de conteúdo, segmentação preditiva e agentes que operam 24/7.",
  },
  {
    icon: BarChart3,
    title: "CRO & analytics",
    desc: "Experimentos contínuos em landing pages, funis e checkout para destravar conversão.",
  },
];

const results = [
  { kpi: "+312%", label: "ROAS médio em 90 dias" },
  { kpi: "-47%", label: "Custo por aquisição" },
  { kpi: "180+", label: "Marcas escaladas" },
  { kpi: "R$ 84M", label: "Receita gerada em 2025" },
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    desc: "Auditamos dados, funil e concorrência para achar as alavancas certas.",
  },
  {
    step: "02",
    title: "Blueprint",
    desc: "Desenhamos um plano de 90 dias com metas, canais e responsáveis claros.",
  },
  {
    step: "03",
    title: "Execução",
    desc: "Squad dedicado roda campanhas, criativos e experimentos toda semana.",
  },
  {
    step: "04",
    title: "Escala",
    desc: "Otimização com IA e review mensal para multiplicar o que funciona.",
  },
];

const testimonials = [
  {
    quote:
      "Em 6 meses saímos de R$ 200k para R$ 1,4M/mês em receita paga. O time do Marketing 2.0 virou parte da nossa operação.",
    name: "Carolina Mendes",
    role: "CMO, Nuvem Retail",
  },
  {
    quote:
      "Finalmente uma agência que entrega relatório que o board entende. Reduziram nosso CAC em 40% no primeiro trimestre.",
    name: "Rafael Torres",
    role: "Head of Growth, Finora",
  },
  {
    quote:
      "A camada de IA que eles implementaram economiza mais de 60 horas por mês do meu time de conteúdo.",
    name: "Isabela Prado",
    role: "Diretora, Casa Zaffé",
  },
];

const plans = [
  {
    name: "Ignite",
    price: "R$ 6.900",
    tag: "Para marcas iniciando tração",
    features: [
      "Até 2 canais de mídia paga",
      "Gestão semanal + relatório",
      "10 criativos por mês",
      "Setup de tracking e GA4",
    ],
  },
  {
    name: "Scale",
    price: "R$ 14.900",
    tag: "Mais popular",
    highlighted: true,
    features: [
      "Todos os canais de mídia paga",
      "Squad dedicado + CRO",
      "30 criativos + copy IA",
      "Dashboard em tempo real",
      "Sprints de experimento",
    ],
  },
  {
    name: "Enterprise",
    price: "Sob medida",
    tag: "Operações complexas",
    features: [
      "Estratégia omnichannel",
      "Agentes de IA sob medida",
      "Data warehouse e atribuição",
      "Workshops executivos",
    ],
  },
];

function Index() {
  return (
    <main className="min-h-screen text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              M
            </span>
            Marketing <span className="text-accent">2.0</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#servicos" className="hover:text-foreground transition">Serviços</a>
            <a href="#resultados" className="hover:text-foreground transition">Resultados</a>
            <a href="#processo" className="hover:text-foreground transition">Processo</a>
            <a href="#planos" className="hover:text-foreground transition">Planos</a>
          </nav>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Falar com estrategista
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Consultoria de marketing com IA no núcleo
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05]">
              Crescimento <span className="gradient-text">previsível</span>
              <br />
              para marcas modernas.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Estratégia, performance e IA em um único squad. Escalamos receita com método, criativos que convertem e dashboards que o CEO entende.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Solicitar diagnóstico gratuito
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#resultados"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/5 transition"
              >
                Ver resultados
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              +180 marcas escaladas · Parceiro Google, Meta e HubSpot
            </p>
          </div>

          {/* KPI strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r) => (
              <div key={r.label} className="glass rounded-2xl p-6 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">
                  {r.kpi}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="border-t border-border/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent">O que fazemos</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold max-w-xl">
                Um squad completo, quatro frentes de crescimento.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Unimos estratégia sênior, mídia performance e automação com IA para que sua marca cresça sem depender de sorte.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group glass rounded-2xl p-6 hover:border-primary/40 transition"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / social proof */}
      <section id="resultados" className="border-t border-border/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-accent">Cases</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">
              Marcas que já viraram a chave.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="glass rounded-2xl p-8 flex flex-col">
                <TrendingUp className="h-6 w-6 text-accent" />
                <blockquote className="mt-6 text-base leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-border/60">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="processo" className="border-t border-border/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-accent">Método</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">
              Um processo em 4 etapas para destravar receita.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.step} className="rounded-2xl border border-border/60 p-6 relative overflow-hidden">
                <div className="font-display text-5xl font-bold text-primary/40">{p.step}</div>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="border-t border-border/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-accent">Planos</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">
              Escolha o ritmo do seu crescimento.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contratos mensais, sem multa. Comece por onde faz sentido para o seu momento.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={
                  "rounded-2xl p-8 flex flex-col " +
                  (p.highlighted
                    ? "bg-gradient-to-b from-primary/25 to-primary/5 border border-primary/40 shadow-2xl shadow-primary/20"
                    : "glass")
                }
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  {p.highlighted && (
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.tag}</p>
                <div className="mt-6 font-display text-4xl font-bold">
                  {p.price}
                  {p.price.startsWith("R$") && (
                    <span className="text-base font-normal text-muted-foreground">/mês</span>
                  )}
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  className={
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition " +
                    (p.highlighted
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border hover:bg-white/5")
                  }
                >
                  Começar agora
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="border-t border-border/50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/25 via-transparent to-accent/20" />
            <Rocket className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-6 text-4xl md:text-5xl font-bold max-w-2xl mx-auto">
              Pronto para escalar com método?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Agende um diagnóstico gratuito de 30 minutos com um estrategista sênior. Você sai com 3 alavancas acionáveis, mesmo que não feche com a gente.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:contato@marketing2.com.br"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Agendar diagnóstico
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-white/5 transition"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
              M
            </span>
            © {new Date().getFullYear()} Marketing 2.0. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#servicos" className="hover:text-foreground transition">Serviços</a>
            <a href="#planos" className="hover:text-foreground transition">Planos</a>
            <a href="#contato" className="hover:text-foreground transition">Contato</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
