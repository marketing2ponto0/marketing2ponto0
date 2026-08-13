import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Menu, X } from "lucide-react";
import { NAV_LINKS, WhatsAppIcon, WHATSAPP } from "./shared";
import { getPublicSettings } from "@/lib/settings.functions";
import { useQuery } from "@tanstack/react-query";


export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => getPublicSettings(),
  });

  const logoUrl = settings?.find((s: any) => s.key === "site_logo_url")?.value;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-ink/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="Marketing 2.0" className="h-11 w-auto" />
          ) : (
            <>
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
            </>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contato"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-brd px-5 py-2.5 text-sm font-semibold text-cream hover:bg-brd-light transition"
        >
          Falar agora
          <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 text-foreground hover:bg-ink-2/60 transition"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border/60 bg-ink/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-4 mt-4 px-3 py-3 border-t border-border/60">
              <a href="https://www.instagram.com/marketing2ponto0" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.facebook.com/marketing2ponto0" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/marketing2ponto0" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@marketing2ponto0" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
            </div>
          </nav>
            <Link
              to="/contato"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brd px-5 py-3 text-sm font-semibold text-cream hover:bg-brd-light transition"
            >
              Falar agora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-10 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-brd text-cream text-xs font-bold">
            M
          </span>
          © {new Date().getFullYear()} Marketing 2.0. Todos os direitos reservados.
        </div>
        <div className="flex gap-6">
          <Link to="/servicos" className="hover:text-foreground transition">Serviços</Link>
          <Link to="/grupo" className="hover:text-foreground transition">Grupo</Link>
          <Link to="/contato" className="hover:text-foreground transition">Contato</Link>
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/60">
            <a href="https://www.instagram.com/marketing2ponto0" target="_blank" rel="noreferrer" className="hover:text-gold transition"><Instagram className="h-4 w-4" /></a>
            <a href="https://www.facebook.com/marketing2ponto0" target="_blank" rel="noreferrer" className="hover:text-gold transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/marketing2ponto0" target="_blank" rel="noreferrer" className="hover:text-gold transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@marketing2ponto0" target="_blank" rel="noreferrer" className="hover:text-gold transition">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 hover:scale-105 transition"
    >
      <WhatsAppIcon className="h-14 w-14" />

    </a>
  );
}
