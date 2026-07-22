import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const MAX_ATTEMPTS = 3;

export const getLeadsDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleErr } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr) throw new Error("Falha ao verificar permissão.");
    if (!isAdmin) throw new Error("Acesso negado.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: recent, error: recentErr } = await supabaseAdmin
      .from("leads")
      .select(
        "id, nome, empresa, email, whatsapp, servico, mensagem, source, created_at, email_notification_attempts, email_notified, email_last_error",
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (recentErr) {
      console.error("[getLeadsDashboard] recent error", recentErr);
      throw new Error("Não foi possível carregar os leads.");
    }

    const leads = recent ?? [];
    const failed = leads.filter(
      (l) => !l.email_notified && (l.email_notification_attempts ?? 0) >= MAX_ATTEMPTS,
    );
    const pending = leads.filter(
      (l) => !l.email_notified && (l.email_notification_attempts ?? 0) < MAX_ATTEMPTS,
    );

    return {
      total: leads.length,
      failedCount: failed.length,
      pendingCount: pending.length,
      notifiedCount: leads.filter((l) => l.email_notified).length,
      maxAttempts: MAX_ATTEMPTS,
      failed,
      leads,
    };
  });
