import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS, WhatsAppIcon, WHATSAPP } from "./shared";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-ink/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                activeProps={{ className: "text-foreground bg-ink-2/60" }}
                className="rounded-lg px-3 py-3 text-muted-foreground hover:bg-ink-2/60 hover:text-foreground transition"
              >
                {l.label}
              </Link>
            ))}
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
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-white shadow-2xl shadow-[#25D366]/40 hover:scale-105 transition"
    >
      <WhatsAppIcon className="h-10 w-10" />
    </a>
  );
}
