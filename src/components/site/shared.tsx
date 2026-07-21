import {
  ArrowRight,
  Award,
  BarChart3,
  Camera,
  Code2,
  Compass,
  Instagram,
  Layers,
  MapPin,
  Megaphone,
  MessageSquare,
  Palette,
  PenTool,
  Printer,
  Repeat,
  Rocket,
  Search,
  Sparkles,
  
  TrendingUp,
  Video,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export const WHATSAPP_NUMBER = "5511934503566";
export const CONTACT_EMAIL = "contato@marketing2ponto0.com.br";
export const WHATSAPP =
  "https://wa.me/5511934503566?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

export function WhatsAppIcon({ className }: { className?: string }) {
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

export const stats = [
  { num: "9+", label: "anos no mercado" },
  { num: "+30", label: "clientes ativos" },
  { num: "100k+", label: "leads captados" },
];

export const clientLogos = [
  "Construmax",
  "RealFit",
  "Clínica Verdi",
  "GrãoCafé",
  "TecnoLog",
  "Moda Haus",
];

export const diferenciais = [
  { icon: BarChart3, title: "Estratégia para criação de conteúdo", desc: "Planejamento editorial personalizado para cada marca e público-alvo." },
  { icon: Megaphone, title: "Tráfego pago (ADS) já incluso", desc: "Google, Meta e TikTok Ads integrados — sem custo extra." },
  { icon: Repeat, title: "Movimentação diária", desc: "Presença ativa e interações todos os dias da semana." },
  { icon: PenTool, title: "Legendas com metodologia própria", desc: "Copywriting que prende o leitor e converte seguidores em clientes." },
  { icon: MessageSquare, title: "Interagir via Direct", desc: "Gestão ativa de mensagens para fortalecer relacionamento." },
  { icon: Search, title: "Análise de concorrência e tendências", desc: "Monitoramos o mercado para manter sua marca à frente." },
];

export const servicos = [
  { icon: Instagram, title: "Gestão de Redes Sociais", desc: "Instagram, Facebook, TikTok, Threads e LinkedIn. Conteúdo e movimentação diária para crescer de verdade.", badge: "Core service" },
  { icon: Megaphone, title: "Tráfego Pago (ADS)", desc: "Campanhas de alta performance no Google, Meta e TikTok. Já incluso no pacote — sem cobrar à parte.", badge: "Incluso" },
  { icon: Video, title: "Posts, Stories e Vídeos", desc: "Criação visual profissional: posts para feed, stories dinâmicos e vídeos para reels e TikTok.", badge: "Criação visual" },
  { icon: Palette, title: "Criação de Logos e Mascotes", desc: "Identidade visual com personalidade, logos, mascotes e peças para todos os canais.", badge: "Branding" },
  { icon: PenTool, title: "Copywriting Estratégico", desc: "Legendas com metodologia que prende o leitor e converte seguidores em clientes reais.", badge: "Conteúdo" },
  { icon: TrendingUp, title: "Análise e Relatórios", desc: "Relatórios mensais com métricas reais: alcance, engajamento, leads e ROI.", badge: "Inteligência" },
];

export const processo = [
  { step: "01", icon: Compass, title: "Diagnóstico", desc: "Analisamos sua presença digital, concorrentes e oportunidades do mercado." },
  { step: "02", icon: Layers, title: "Estratégia", desc: "Plano personalizado com canais, frequência, linha editorial e metas claras." },
  { step: "03", icon: Rocket, title: "Execução", desc: "Criamos, publicamos e interagimos diariamente. ADS ativo desde o 1º mês." },
  { step: "04", icon: TrendingUp, title: "Otimização", desc: "Monitoramos dados em tempo real e ajustamos para maximizar resultados." },
];

export const depoimentos = [
  { quote: "Em menos de 3 meses triplicamos a captação de alunos. A equipe move as redes todos os dias e os resultados são muito claros. Recomendo de olhos fechados.", name: "Marcos Ferreira", role: "Sócio — RealFit Academia", initials: "MF" },
  { quote: "O diferencial é a movimentação diária. Antes sumia depois de postar. Agora meu perfil está sempre ativo e clientes chegam pelo Instagram todo dia.", name: "Dra. Ana Verdi", role: "Diretora — Clínica Verdi", initials: "AV" },
  { quote: "O tráfego pago incluso foi decisivo. Pagamos um valor justo e o anúncio já veio junto. Em 6 meses o retorno foi de 7x. Resultado real, sem enrolação.", name: "Rafael Costa", role: "CEO — TecnoLog", initials: "RC" },
];

export const grupo = [
  { name: "UP Fotos e Vídeos", tag: "Produção audiovisual", color: "from-pink-500/20 to-transparent", icon: Camera },
  { name: "A3H Print", tag: "Comunicação impressa", color: "from-amber-500/20 to-transparent", icon: Printer },
  { name: "Trinity Tecnologias", tag: "Sites e sistemas", color: "from-sky-500/20 to-transparent", icon: Code2 },
  { name: "Buskiache", tag: "Guia comercial + app", color: "from-emerald-500/20 to-transparent", icon: MapPin },
];

export const servicoOptions = [
  "Gestão de Redes Sociais",
  "Tráfego Pago (ADS)",
  "Criação de Conteúdo",
  "Branding & Logo",
  "Pacote completo",
  "Quero orientação",
];

export const NAV_LINKS = [
  { to: "/diferenciais", label: "Diferenciais" },
  { to: "/servicos", label: "Serviços" },
  { to: "/processo", label: "Processo" },
  { to: "/grupo", label: "Grupo" },
  { to: "/depoimentos", label: "Clientes" },
] as const;

export function PageHeader({
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
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h1 className="mt-6 font-display text-4xl md:text-6xl font-extrabold leading-[1.05]">
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="gradient-gold">{highlight}</span>
          </>
        ) : null}
      </h1>
      {description ? (
        <p className="mt-5 text-lg text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="border-y border-border/60 py-16 bg-gradient-to-br from-brd via-brd-dark to-ink">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">Pronto para crescer?</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-cream max-w-2xl">
            <span className="gradient-gold">Transforme suas redes</span> em canais de crescimento real
          </h2>
        </div>
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-brd hover:bg-gold hover:text-ink transition brand-shadow shrink-0"
        >
          Quero uma proposta gratuita
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
