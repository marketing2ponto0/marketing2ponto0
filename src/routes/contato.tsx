import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Instagram, Loader2, Mail, Phone } from "lucide-react";
import {
  WhatsAppIcon,
  WHATSAPP,
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  servicoOptions,
} from "../components/site/shared";
import { submitLead, recordLeadNotification } from "@/lib/leads.functions";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Marketing 2.0" },
      {
        name: "description",
        content:
          "Fale com a Marketing 2.0. Preencha o formulário e receba uma análise inicial gratuita em até 24h.",
      },
      { property: "og:title", content: "Contato — Marketing 2.0" },
      {
        property: "og:description",
        content: "Vamos conversar sobre o seu negócio.",
      },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const send = useServerFn(submitLead);
  const recordNotif = useServerFn(recordLeadNotification);

  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">
              Fale com a gente
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">
              Vamos conversar
              <br />
              sobre o seu <span className="gradient-gold">negócio</span>
            </h1>
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
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 rounded-2xl border border-border/60 p-4 hover:border-gold/40 transition"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brd/25 text-gold">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">E-mail</div>
                  <div className="font-semibold">{CONTACT_EMAIL}</div>
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
            onSubmit={async (e) => {
              e.preventDefault();
              if (submitting) return;

              const fd = new FormData(e.currentTarget);
              const nome = String(fd.get("nome") || "").trim();
              const empresa = String(fd.get("empresa") || "").trim();
              const email = String(fd.get("email") || "").trim();
              const whatsapp = String(fd.get("whatsapp") || "").trim();
              const servico = String(fd.get("servico") || "").trim();
              const mensagem = String(fd.get("mensagem") || "").trim();

              setErrorMsg(null);
              setSubmitting(true);
              let leadResult: { leadId: string; web3formsKey: string | null } | null = null;
              try {
                leadResult = await send({
                  data: { nome, empresa, email, whatsapp, servico, mensagem },
                });
              } catch (err) {
                console.error(err);
                setErrorMsg(
                  "Não conseguimos registrar seu contato agora. Você pode falar direto pelo WhatsApp.",
                );
                setSubmitting(false);
                return;
              }

              // Web3Forms exige envio pelo navegador no plano free
              if (leadResult?.web3formsKey && leadResult.leadId) {
                const linhasEmail = [
                  `Nome: ${nome}`,
                  empresa ? `Empresa: ${empresa}` : null,
                  `E-mail: ${email}`,
                  whatsapp ? `WhatsApp: ${whatsapp}` : null,
                  servico ? `Serviço: ${servico}` : null,
                  mensagem ? `\nMensagem:\n${mensagem}` : null,
                ]
                  .filter(Boolean)
                  .join("\n");
                const MAX = 3;
                let attempts = 0;
                let notified = false;
                let lastError: string | null = null;
                for (let i = 0; i < MAX; i++) {
                  attempts = i + 1;
                  try {
                    const res = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Accept: "application/json" },
                      body: JSON.stringify({
                        access_key: leadResult.web3formsKey,
                        subject: `Novo lead do site${servico ? ` — ${servico}` : ""}`,
                        from_name: "Site Marketing 2.0",
                        email,
                        replyto: email,
                        message: linhasEmail,
                        nome,
                        empresa,
                        whatsapp,
                        servico,
                      }),
                    });
                    const json = await res.json().catch(() => ({}));
                    if (res.ok && json?.success) {
                      notified = true;
                      lastError = null;
                      break;
                    }
                    lastError = `HTTP ${res.status}: ${json?.message ?? "falha"}`;
                  } catch (err) {
                    lastError = err instanceof Error ? err.message : String(err);
                  }
                  if (i < MAX - 1) {
                    await new Promise((r) => setTimeout(r, 500 * Math.pow(3, i)));
                  }
                }
                recordNotif({
                  data: { leadId: leadResult.leadId, attempts, notified, lastError },
                }).catch(() => {});
              }


              const linhas = [
                `Nome: ${nome}`,
                empresa && `Empresa: ${empresa}`,
                `E-mail: ${email}`,
                whatsapp && `WhatsApp: ${whatsapp}`,
                servico && `Serviço: ${servico}`,
                mensagem && `Mensagem: ${mensagem}`,
              ].filter(Boolean) as string[];

              const corpo = linhas.join("\n");
              const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Olá! Sou ${nome || "um novo contato"} e vim pelo site.\n\n${corpo}`,
              )}`;
              window.open(waUrl, "_blank", "noopener,noreferrer");

              setSubmitting(false);
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
                  Recebemos seu contato e já abrimos o WhatsApp para agilizar a conversa. Falaremos em breve.
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
                      name="nome"
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
                      name="empresa"
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
                      name="email"
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
                      name="whatsapp"
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
                    name="servico"
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
                    name="mensagem"
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-border/80 bg-ink/60 px-4 py-3 text-sm focus:border-gold focus:outline-none transition resize-none"
                    placeholder="Conte sobre seu negócio..."
                  />
                </label>
                {errorMsg ? (
                  <p className="text-sm text-red-400 text-center">{errorMsg}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brd px-6 py-3.5 text-sm font-semibold text-cream hover:bg-brd-light transition brand-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      Enviando...
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Seu contato é registrado com segurança e abrimos o WhatsApp para agilizar.
                </p>
              </>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
