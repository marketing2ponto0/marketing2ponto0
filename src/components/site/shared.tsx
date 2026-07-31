import {
  ArrowRight,
  Award,
  BarChart3,
  Camera,
  Code2,
  Compass,
  Eye,
  Heart,
  Target,
  Instagram,
  Layers,
  Link2,
  MapPin,
  Megaphone,
  MessageSquare,
  Palette,
  PenTool,
  Printer,
  Repeat,
  Rocket,
  Search,
  TrendingUp,
  Tv,
  Users,
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
  { num: "+10", label: "anos no mercado" },
  { num: "+50", label: "clientes ativos" },
  { num: "+100K", label: "leads captados" },
];

export const clientLogos = [
  "Santo Gole",
  "HB Imóveis SP",
  "Tríade Corretora BR",
  "CDL Franco da Rocha",
  "Amanda Carvalho Celebrante",
  "Parador do Pay",
  "Canoa Cantareira",
  "Visãotek",
  "Clinic Medicina Diagnóstica",
  "Clinicard +",
  "Construmax",
  "RealFit",
  "Clínica Verdi",
  "GrãoCafé",
  "TecnoLog",
  "Moda Haus",
];

export const quemSomos = {
  title: "O Motor de Crescimento do Seu Negócio",
  desc: "Há uma década, a Marketing 2.0 transforma marcas em líderes de mercado. Unimos inteligência estratégica, inovação contínua e execução de alta performance para entregar o que realmente importa: crescimento previsível, posicionamento forte e escala para o seu negócio.\n\nCuidamos da sua presença digital e física com a responsabilidade e a precisão de quem domina o ecossistema de vendas e comunicação, gerando valor real para sua empresa, seus clientes e sua equipe.",
  bullets: [
    "Atendimento personalizado e próximo.",
    "Estratégias baseadas em dados e performance.",
    "Equipe criativa e apaixonada por resultados.",
    "Transparência em cada etapa do processo.",
  ],
};

export const mvv = [
  {
    icon: Target,
    label: "Missão",
    title: "Crescimento digital com inteligência",
    desc: "Ajudar empresas a crescerem no ambiente digital com estratégias inteligentes, criativas e mensuráveis.",
  },
  {
    icon: Eye,
    label: "Visão",
    title: "Referência em marketing digital no Brasil",
    desc: "Ser referência em marketing digital no Brasil, reconhecida pela inovação e resultados consistentes.",
  },
  {
    icon: Heart,
    label: "Valores",
    title: "Nossos pilares",
    desc: "Comprometimento, criatividade, transparência e foco em resultados.",
  },
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
  {
    name: "UP Fotos e Vídeos",
    tag: "Produção audiovisual",
    color: "from-pink-500/20 to-transparent",
    icon: Camera,
    to: "/up-fotos" as const,
    description:
      "Produção audiovisual completa para marcas que precisam de imagem forte: fotografia de produto, ensaios institucionais, vídeos para redes sociais, reels e cobertura de eventos.",
    bullets: [
      "Fotografia de produto e catálogo",
      "Ensaios institucionais e de equipe",
      "Reels, shorts e vídeos verticais",
      "Cobertura de eventos e making of",
      "Edição, cor e finalização profissional",
    ],
  },
  {
    name: "A3H Print",
    tag: "Comunicação impressa",
    color: "from-amber-500/20 to-transparent",
    icon: Printer,
    to: "/a3h-print" as const,
    description:
      "Comunicação impressa e visual com acabamento premium: do cartão de visita à fachada, garantindo que a marca seja consistente no digital e no físico.",
    bullets: [
      "Cartões, folders e materiais promocionais",
      "Banners, faixas e adesivos",
      "Comunicação visual e fachadas",
      "Brindes e materiais personalizados",
      "Acabamento premium e entrega rápida",
    ],
  },
  {
    name: "Trinity Tecnologias",
    tag: "Sites e sistemas",
    color: "from-sky-500/20 to-transparent",
    icon: Code2,
    to: "/trinity-tecnologias" as const,
    description:
      "Tecnologia sob medida para o crescimento: sites de alta conversão, landing pages, e-commerce e sistemas internos integrados às campanhas de marketing.",
    bullets: [
      "Sites institucionais e landing pages",
      "Lojas virtuais e integrações de pagamento",
      "Sistemas e automações sob medida",
      "Integração com CRM e WhatsApp",
      "Performance, SEO técnico e segurança",
    ],
  },
  {
    name: "Buskiache",
    tag: "Guia comercial + app",
    color: "from-emerald-500/20 to-transparent",
    icon: MapPin,
    to: "/buskiache" as const,
    description:
      "Guia comercial e aplicativo que conecta empresas locais a novos clientes, ampliando a visibilidade da sua marca na região onde ela mais vende.",
    bullets: [
      "Perfil comercial destacado no guia",
      "Presença no aplicativo Buskiache",
      "Divulgação regional segmentada",
      "Promoções e campanhas locais",
      "Mais visibilidade para o comércio de bairro",
    ],
  },
  {
    name: "Mídia OOH 360º",
    tag: "TV e rádio indoor",
    color: "from-violet-500/20 to-transparent",
    icon: Tv,
    to: "/midia-ooh-360" as const,
    site: "https://midiaooh360.lovable.app",
    description:
      "Sistema de TV e rádio indoor para comércios: sua programação, seus anúncios e os de parceiros rodando na tela do ponto de venda, com gestão remota e opção de revenda.",
    bullets: [
      "TV indoor em qualquer Smart TV com internet",
      "Rádio indoor com locuções e ofertas",
      "Programação e playlists gerenciadas à distância",
      "Espaço publicitário para monetizar sua tela",
      "Modelo de revenda para agências e parceiros",
    ],
  },
  {
    name: "Venda no Link",
    tag: "Vendas por link e catálogo",
    color: "from-rose-500/20 to-transparent",
    icon: Link2,
    to: "/venda-no-link" as const,
    description:
      "Plataforma para vender direto pelo link: catálogo digital, checkout rápido e pedidos que caem no WhatsApp — ideal para quem vende por redes sociais.",
    bullets: [
      "Catálogo digital pronto para compartilhar",
      "Link único para bio, stories e WhatsApp",
      "Checkout simples e pedidos organizados",
      "Cupons, promoções e produtos em destaque",
      "Integração com as campanhas de tráfego pago",
    ],
  },
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
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/diferenciais", label: "Diferenciais" },
  { to: "/servicos", label: "Serviços" },
  { to: "/processo", label: "Processo" },
  { to: "/grupo", label: "Grupo" },
  { to: "/depoimentos", label: "Clientes" },
  { to: "/portfolio", label: "Portfólio" },
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
    <section className="relative overflow-hidden border-y border-border/60 py-16 bg-gradient-to-br from-brd-dark via-brd to-brd-dark">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.4),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Pronto para crescer?</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-white max-w-2xl leading-tight">
            <span className="gradient-gold">Transforme suas redes</span> em canais de crescimento real
          </h2>
        </div>
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-gold-soft transition shadow-lg shrink-0"
        >
          Quero uma proposta gratuita
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
