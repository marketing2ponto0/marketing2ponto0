import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
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
                    className={`rounded-2xl border border-border/60 bg-gradient-to-br ${g.color} p-5 hover:border-gold/40 transition block`}
                  >
                    <g.icon className="h-5 w-5 text-gold" />
                    <h3 className="mt-4 font-display text-base font-bold">{g.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
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
