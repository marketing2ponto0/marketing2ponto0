import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { grupo, PageHeader, CtaBand } from "./shared";

export function GrupoDetail({ name }: { name: string }) {
  const item = grupo.find((g) => g.name === name);
  if (!item) return null;
  const Icon = item.icon;

  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            to="/grupo"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para o grupo
          </Link>

          <div className="mt-8">
            <PageHeader
              eyebrow="Grupo Marketing 2.0"
              title={item.name}
              highlight=""
              description={item.tag}
            />
          </div>

          <div
            className={`mt-12 rounded-2xl border border-border/60 bg-gradient-to-br ${item.color} p-8 md:p-10`}
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brd">
              <Icon className="h-6 w-6 text-gold" />
            </div>
            <p className="mt-6 text-base md:text-lg leading-relaxed">{item.description}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {"site" in item && item.site ? (
              <a
                href={item.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brd px-5 py-3 text-sm font-semibold text-cream hover:bg-brd/90 transition"
              >
                Acessar plataforma <ExternalLink className="h-4 w-4 text-gold" />
              </a>
            ) : null}
          </div>

          <div className="mt-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Outras empresas do grupo
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {grupo
                .filter((g) => g.name !== item.name)
                .map((g) => (
                  <Link
                    key={g.name}
                    to={g.to}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-ink-2 p-8 hover:border-brd hover:shadow-xl hover:-translate-y-1 transition"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brd to-brd-dark text-cream group-hover:from-gold group-hover:to-gold-soft group-hover:text-foreground transition">
                      <g.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-base font-bold group-hover:text-brd transition">{g.name}</h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-foreground/60 group-hover:text-gold transition">
                      {g.tag}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
