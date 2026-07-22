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

    const { error } = await supabase.from("leads").insert({
      nome: data.nome,
      empresa: data.empresa || null,
      email: data.email,
      whatsapp: data.whatsapp || null,
      servico: data.servico || null,
      mensagem: data.mensagem || null,
      source: "site",
    });

    if (error) {
      console.error("[submitLead] insert error", error);
      throw new Error("Não foi possível registrar seu contato. Tente novamente.");
    }

    // Notificação por e-mail via Web3Forms (não bloqueia o retorno)
    const w3fKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (w3fKey) {
      try {
        const subject = `Novo lead do site${data.servico ? ` — ${data.servico}` : ""}`;
        const linhas = [
          `Nome: ${data.nome}`,
          data.empresa ? `Empresa: ${data.empresa}` : null,
          `E-mail: ${data.email}`,
          data.whatsapp ? `WhatsApp: ${data.whatsapp}` : null,
          data.servico ? `Serviço: ${data.servico}` : null,
          data.mensagem ? `\nMensagem:\n${data.mensagem}` : null,
        ].filter(Boolean).join("\n");

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
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
          }),
        });
        if (!res.ok) {
          const body = await res.text();
          console.error("[submitLead] web3forms error", res.status, body);
        }
      } catch (e) {
        console.error("[submitLead] web3forms exception", e);
      }
    }

    return { ok: true };
  });

