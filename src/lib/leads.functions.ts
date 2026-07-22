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
      console.error("[submitLead] insert error", JSON.stringify(error), "code=", error?.code, "msg=", error?.message, "details=", error?.details, "hint=", error?.hint);
      throw new Error("Não foi possível registrar seu contato. Tente novamente.");
    }

    return {
      ok: true,
      leadId: inserted.id,
      web3formsKey: process.env.WEB3FORMS_ACCESS_KEY ?? null,
    };
  });

const notifySchema = z.object({
  leadId: z.string().uuid(),
  attempts: z.number().int().min(0).max(10),
  notified: z.boolean(),
  lastError: z.string().max(1000).nullable(),
});

export const recordLeadNotification = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => notifySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("leads")
      .update({
        email_notification_attempts: data.attempts,
        email_notified: data.notified,
        email_last_error: data.lastError,
      })
      .eq("id", data.leadId);
    if (error) console.error("[recordLeadNotification]", error);
    return { ok: !error };
  });


