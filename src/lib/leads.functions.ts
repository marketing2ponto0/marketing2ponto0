import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const leadSchema = z.object({
  nome: z.string().trim().min(1).max(120),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  servico: z.string().trim().max(120).optional().or(z.literal("")),
  mensagem: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: inserted, error } = await supabase
      .from("leads")
      .insert({
        nome: data.nome,
        empresa: data.empresa || null,
        email: data.email,
        whatsapp: data.whatsapp || null,
        servico: data.servico || null,
        mensagem: data.mensagem || null,
        source: "site",
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("[submitLead] insert error", error);
      throw new Error("Não foi possível registrar seu contato. Tente novamente.");
    }

    // Notificação por e-mail via Web3Forms com retry + backoff exponencial
    const w3fKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (w3fKey) {
      const MAX_ATTEMPTS = 3;
      const subject = `Novo lead do site${data.servico ? ` — ${data.servico}` : ""}`;
      const linhas = [
        `Nome: ${data.nome}`,
        data.empresa ? `Empresa: ${data.empresa}` : null,
        `E-mail: ${data.email}`,
        data.whatsapp ? `WhatsApp: ${data.whatsapp}` : null,
        data.servico ? `Serviço: ${data.servico}` : null,
        data.mensagem ? `\nMensagem:\n${data.mensagem}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const payload = JSON.stringify({
        access_key: w3fKey,
        subject,
        from_name: "Site Marketing 2.0",
        email: data.email,
        replyto: data.email,
        message: linhas,
        nome: data.nome,
        empresa: data.empresa || "",
        whatsapp: data.whatsapp || "",
        servico: data.servico || "",
      });

      let attempts = 0;
      let notified = false;
      let lastError: string | null = null;

      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        attempts = i + 1;
        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: payload,
          });
          if (res.ok) {
            notified = true;
            lastError = null;
            console.log(`[submitLead] web3forms ok (tentativa ${attempts})`);
            break;
          }
          lastError = `HTTP ${res.status}: ${(await res.text()).slice(0, 500)}`;
          console.error(
            `[submitLead] web3forms falhou (tentativa ${attempts}/${MAX_ATTEMPTS})`,
            lastError,
          );
        } catch (e) {
          lastError = e instanceof Error ? e.message : String(e);
          console.error(
            `[submitLead] web3forms exceção (tentativa ${attempts}/${MAX_ATTEMPTS})`,
            lastError,
          );
        }

        if (i < MAX_ATTEMPTS - 1) {
          // Backoff exponencial: 500ms, 1500ms
          await new Promise((r) => setTimeout(r, 500 * Math.pow(3, i)));
        }
      }

      const { error: updErr } = await supabase
        .from("leads")
        .update({
          email_notification_attempts: attempts,
          email_notified: notified,
          email_last_error: lastError,
        })
        .eq("id", inserted.id);

      if (updErr) {
        console.error("[submitLead] update notification status error", updErr);
      }
    }

    return { ok: true };
  });


