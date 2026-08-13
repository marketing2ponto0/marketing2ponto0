import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Site Settings & Asset Management
 * All functions use supabaseAdmin to handle internal state and signed URLs.
 */

const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error("Falha ao verificar permissão.");
  if (!data) throw new Error("Acesso negado.");
}

export const listSettings = createServerFn({ method: "GET" })
  .handler(async ({ context }: any) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;
    if (!userId) throw new Error("Unauthorized");
    await assertAdmin(supabaseAdmin, userId);

    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("key, value");

    if (error) throw new Error(error.message);
    return (data as any[]) ?? [];
  });

export const updateSetting = createServerFn({ method: "POST" })
  .inputValidator((input: { key: string; value: string }) =>
    z.object({ key: z.string().min(1), value: z.string() }).parse(input),
  )
  .handler(async ({ data, context }: any) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;
    if (!userId) throw new Error("Unauthorized");
    await assertAdmin(supabaseAdmin, userId);

    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert({ key: data.key, value: data.value });

    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const uploadAsset = createServerFn({ method: "POST" }).handler(
  async (args: any) => {
    const { request, context } = args;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;
    if (!userId) throw new Error("Unauthorized");
    await assertAdmin(supabaseAdmin, userId);

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = (formData.get("bucket") as string) || "assets";

    if (!file) throw new Error("Arquivo não fornecido.");

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

    // Ensure bucket exists
    await supabaseAdmin.storage.createBucket(bucket, { public: true }).catch(() => {});

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw new Error(error.message);

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path);

    return { url: publicUrl };
  },
);

export const getPublicSettings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("key, value");

    if (error) {
      console.error("[Settings] Error fetching public settings:", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[Settings] Critical failure in getPublicSettings:", err);
    return [];
  }
});
