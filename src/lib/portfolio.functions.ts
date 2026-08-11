import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 dias

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error("Falha ao verificar permissão.");
  if (!data) throw new Error("Acesso negado.");
}

const slideSchema = z.object({
  id: z.string().uuid().optional(),
  media_type: z.enum(["image", "video"]).default("image"),
  media_url: z.string().min(1).max(500),
  poster_url: z.string().max(500).nullable().optional(),
  caption: z.string().max(300).nullable().optional(),
  order_index: z.number().int().min(0).max(999).default(0),
  active: z.boolean().default(true),
});

/** Lista pública (usada no site) — assina URLs do bucket privado. */
export const listPortfolioSlidesPublic = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("portfolio_slides")
      .select("id, media_type, media_url, poster_url, caption, order_index")
      .eq("active", true)
      .order("order_index");
    
    if (error) {
      console.error("[Portfolio] Database error:", error.message);
      return [];
    }

    const rows = data ?? [];
    if (rows.length === 0) return [];

    const paths = rows.flatMap((r) => [r.media_url, r.poster_url].filter(Boolean) as string[]);
    const map = new Map<string, string>();
    
    if (paths.length) {
      const { data: signed, error: storageError } = await supabaseAdmin.storage
        .from("portfolio")
        .createSignedUrls(paths, SIGNED_URL_TTL);
      
      if (storageError) {
        console.error("[Portfolio] Storage error:", storageError.message);
      } else {
        for (const s of signed ?? []) {
          if (s.path && s.signedUrl) map.set(s.path, s.signedUrl);
        }
      }
    }

    return rows.map((r) => ({
      id: r.id,
      media_type: r.media_type as "image" | "video",
      caption: r.caption,
      url: map.get(r.media_url) ?? r.media_url,
      poster: r.poster_url ? (map.get(r.poster_url) ?? r.poster_url) : null,
    }));
  } catch (err) {
    console.error("[Portfolio] Fetch failed:", err);
    return [];
  }
});

export const listPortfolioSlidesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("portfolio_slides")
      .select("*")
      .order("order_index");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const savePortfolioSlide = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => slideSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const payload = {
      media_type: data.media_type,
      media_url: data.media_url,
      poster_url: data.poster_url ?? null,
      caption: data.caption ?? null,
      order_index: data.order_index,
      active: data.active,
    };
    if (data.id) {
      const { error } = await context.supabase
        .from("portfolio_slides")
        .update(payload)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await context.supabase
      .from("portfolio_slides")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: inserted!.id };
  });

export const deletePortfolioSlide = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("portfolio_slides")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
