import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, RefreshCw, LogOut, Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getLeadsDashboard } from "@/lib/leads-dashboard.functions";
import {
  getAdminStatus,
  listTexts,
  upsertText,
  listServicesAdmin,
  saveService,
  deleteService,
  listTestimonialsAdmin,
  saveTestimonial,
  deleteTestimonial,
  listLogosAdmin,
  saveLogo,
  deleteLogo,
} from "@/lib/admin.functions";
import { listSettings, updateSetting, uploadAsset } from "@/lib/settings.functions";
import {
  listPortfolioSlidesAdmin,
  savePortfolioSlide,
  deletePortfolioSlide,
} from "@/lib/portfolio.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel Admin · Marketing 2.0" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center text-foreground">
      <h1 className="text-2xl font-bold">Erro</h1>
      <p className="mt-3 text-foreground/70">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => <div className="p-8 text-foreground">Não encontrado.</div>,
  component: AdminPage,
});

type Tab = "leads" | "config" | "textos" | "servicos" | "depoimentos" | "logos" | "portfolio" | "videos" | "social";

const inputCls = "w-full rounded-md border border-border bg-ink px-3 py-2 text-sm text-foreground focus:border-brd/40 focus:outline-none";

function Badge({ children, tone }: { children: React.ReactNode; tone: "success" | "warning" | "danger" | "neutral" }) {
  const tones = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    neutral: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone: "success" | "warning" | "danger" | "neutral" }) {
  const colors = {
    success: "text-emerald-400",
    warning: "text-amber-400",
    danger: "text-red-400",
    neutral: "text-foreground",
  };
  return (
    <div className="rounded-xl border border-border bg-ink-2 p-4 text-center">
      <div className="text-[10px] uppercase tracking-wider text-foreground/50">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${colors[tone]}`}>{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-foreground/50">{label}</label>
      {children}
    </div>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("leads");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    getAdminStatus().then((r) => setIsAdmin(r.isAdmin)).catch(() => setIsAdmin(false));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin === null) {
    return <div className="p-8 text-foreground/60">Carregando...</div>;
  }
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-foreground">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-2xl font-bold">Acesso restrito</h1>
        <p className="mt-2 text-foreground/70">
          Sua conta não tem permissão de administrador. Entre com o e-mail autorizado.
        </p>
        <button onClick={signOut} className="mt-6 rounded-lg border border-border px-4 py-2 text-sm hover:bg-ink-2">
          Sair
        </button>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "leads", label: "Leads" },
    { key: "config", label: "Configurações" },
    { key: "textos", label: "Textos" },
    { key: "servicos", label: "Serviços" },
    { key: "depoimentos", label: "Depoimentos" },
    { key: "logos", label: "Logos" },
    { key: "portfolio", label: "Portfólio (Imagens)" },
    { key: "videos", label: "Vídeos do Portfólio" },
    { key: "social", label: "Redes Sociais" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-foreground">
      <div className="mb-4">
        <Link to="/" className="text-xs font-medium text-foreground/50 hover:text-brd transition">
          ← Voltar para o site
        </Link>
      </div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel Admin</h1>
          <p className="mt-1 text-sm text-foreground/60">Gerencie leads e conteúdo do site.</p>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 rounded-lg border border-border bg-ink-2 px-3 py-2 text-sm hover:bg-ink-2/80">
          <LogOut className="h-4 w-4" /> Sair
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium transition ${
              tab === t.key ? "border-b-2 border-brd text-brd" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "leads" && <LeadsTab />}
      {tab === "config" && <ConfigTab />}
      {tab === "textos" && <TextsTab />}
      {tab === "servicos" && <ServicesTab />}
      {tab === "depoimentos" && <TestimonialsTab />}
      {tab === "logos" && <LogosTab />}
      {tab === "portfolio" && <PortfolioTab filter="image" />}
      {tab === "videos" && <PortfolioTab filter="video" />}
      {tab === "social" && <SocialTab />}
    </div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

function LeadsTab() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try { setData(await getLeadsDashboard()); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  if (loading || !data) return <p className="text-foreground/60">Carregando leads...</p>;
  const hasFailures = data.failedCount > 0;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={refresh} className="inline-flex items-center gap-2 rounded-lg border border-border bg-ink-2 px-3 py-2 text-sm hover:bg-ink-2/80">
          <RefreshCw className="h-4 w-4" /> Atualizar
        </button>
      </div>

      {hasFailures && (
        <div role="alert" className="mb-8 rounded-xl border border-red-500/40 bg-red-500/10 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-400" />
            <div>
              <h2 className="font-semibold text-red-100">
                {data.failedCount} {data.failedCount === 1 ? "lead esgotou" : "leads esgotaram"} as tentativas de e-mail
              </h2>
              <p className="mt-1 text-sm text-red-100/80">
                Foram feitas {data.maxAttempts} tentativas sem sucesso. O contato está salvo — entre em contato manualmente.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Total" value={data.total} tone="neutral" />
        <Stat label="Notificados" value={data.notifiedCount} tone="success" />
        <Stat label="Aguardando" value={data.pendingCount} tone="warning" />
        <Stat label="Falharam" value={data.failedCount} tone="danger" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-ink-2 text-left text-xs uppercase tracking-wide text-foreground/60">
            <tr>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Serviço</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.leads.map((l: any) => {
              const attempts = l.email_notification_attempts ?? 0;
              const failed = !l.email_notified && attempts >= data.maxAttempts;
              return (
                <tr key={l.id} className="align-top">
                  <td className="px-4 py-3 text-foreground/70">{formatDate(l.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{l.nome}</div>
                    {l.empresa && <div className="text-foreground/50">{l.empresa}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <div>{l.email}</div>
                    {l.whatsapp && <div className="text-foreground/50">{l.whatsapp}</div>}
                  </td>
                  <td className="px-4 py-3 text-foreground/70">{l.servico || "—"}</td>
                  <td className="px-4 py-3">
                    {l.email_notified ? (
                      <Badge tone="success"><CheckCircle2 className="h-3 w-3" /> Notificado</Badge>
                    ) : failed ? (
                      <Badge tone="danger"><AlertTriangle className="h-3 w-3" /> Falhou ({attempts}/{data.maxAttempts})</Badge>
                    ) : (
                      <Badge tone="warning"><Clock className="h-3 w-3" /> {attempts}/{data.maxAttempts}</Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ConfigTab() {
  const [settings, setSettings] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try { setSettings((await listSettings()) as { key: string; value: string }[]); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  async function handleUpload(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(key);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "assets");
      
      const { url } = await uploadAsset({ data: formData as any }) as { url: string };
      await updateSetting({ data: { key, value: url } });
      refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(null);
    }
  }

  if (loading) return <p className="text-foreground/60">Carregando configurações...</p>;

  const logoUrl = settings.find(s => s.key === "site_logo_url")?.value;
  const faviconUrl = settings.find(s => s.key === "site_favicon_url")?.value;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-ink-2 p-6">
        <h3 className="mb-4 text-lg font-bold">Identidade Visual</h3>
        <div className="space-y-6">
          <Field label="Logo Principal">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded border border-border bg-ink flex items-center justify-center">
                {logoUrl ? <img src={logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" /> : <span className="text-[10px] text-foreground/30">Sem logo</span>}
              </div>
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleUpload("site_logo_url", e)}
                  disabled={uploading === "site_logo_url"}
                  className="w-full text-xs text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brd file:text-cream hover:file:bg-brd-light transition cursor-pointer"
                />
                {uploading === "site_logo_url" && <p className="mt-1 text-[10px] text-gold animate-pulse">Enviando...</p>}
              </div>
            </div>
          </Field>

          <Field label="Favicon">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 overflow-hidden rounded border border-border bg-ink flex items-center justify-center">
                {faviconUrl ? <img src={faviconUrl} alt="Favicon" className="h-6 w-6 object-contain" /> : <span className="text-[10px] text-foreground/30">ICO</span>}
              </div>
              <div className="flex-1">
                <input 
                  type="file" 
                  accept=".ico,.png" 
                  onChange={(e) => handleUpload("site_favicon_url", e)}
                  disabled={uploading === "site_favicon_url"}
                  className="w-full text-xs text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brd file:text-cream hover:file:bg-brd-light transition cursor-pointer"
                />
                {uploading === "site_favicon_url" && <p className="mt-1 text-[10px] text-gold animate-pulse">Enviando...</p>}
              </div>
            </div>
          </Field>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-ink-2 p-6">
        <h3 className="mb-4 text-lg font-bold">Logos do Ecossistema</h3>
        <div className="space-y-6">
          {[
            "UP Fotos e Vídeos",
            "A3H Print",
            "Trinity Tecnologias",
            "Buskiache",
            "Mídia OOH 360º",
            "Venda no Link"
          ].map((name) => {
            const key = `site_logo_${name.toLowerCase().replace(/ /g, "_")}`;
            const url = settings.find(s => s.key === key)?.value;
            return (
              <Field key={key} label={name}>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded border border-border bg-ink flex items-center justify-center">
                    {url ? <img src={url} alt={name} className="max-h-full max-w-full object-contain" /> : <span className="text-[10px] text-foreground/30">Sem logo</span>}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleUpload(key, e)}
                      disabled={!!uploading && uploading === key}
                      className="w-full text-xs text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brd file:text-cream hover:file:bg-brd-light transition cursor-pointer"
                    />
                    {uploading === key && <p className="mt-1 text-[10px] text-gold animate-pulse">Enviando...</p>}
                  </div>
                </div>
              </Field>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TextsTab() {

  const [items, setItems] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try { setItems(await listTexts()); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  async function save(key: string, value: string) {
    setSaving(key); setMessage(null);
    try {
      await upsertText({ data: { key, value } });
      setMessage(`"${key}" salvo`);
      setTimeout(() => setMessage(null), 2000);
    } catch (e: any) {
      setMessage(e.message);
    } finally { setSaving(null); }
  }

  if (loading) return <p className="text-foreground/60">Carregando textos...</p>;

  return (
    <div className="space-y-4">
      {message && <div className="rounded-md bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{message}</div>}
      {items.map((t) => (
        <TextRow key={t.key} initial={t} onSave={save} saving={saving === t.key} />
      ))}
    </div>
  );
}

function TextRow({ initial, onSave, saving }: { initial: { key: string; value: string }; onSave: (k: string, v: string) => void; saving: boolean }) {
  const [value, setValue] = useState(initial.value);
  return (
    <div className="rounded-lg border border-border bg-ink-2 p-4">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs uppercase tracking-wide text-foreground/60">{initial.key}</label>
        <button
          onClick={() => onSave(initial.key, value)}
          disabled={saving || value === initial.value}
          className="inline-flex items-center gap-1 rounded-md bg-brd px-3 py-1 text-xs font-semibold text-cream disabled:opacity-50"
        >
          <Save className="h-3 w-3" /> {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={value.length > 80 ? 3 : 1}
        className={inputCls}
      />
    </div>
  );
}

function SocialTab() {
  const [items, setItems] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const socialKeys = ["site_insta", "site_fb", "site_linkedin", "site_tiktok"];

  async function refresh() {
    setLoading(true);
    try { 
      const settings = await listSettings();
      setItems(settings as { key: string; value: string }[]); 
    }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  async function save(key: string, value: string) {
    setSaving(key); setMessage(null);
    try {
      await updateSetting({ data: { key, value } });
      setMessage(`Link salvo`);
      setTimeout(() => setMessage(null), 2000);
      refresh();
    } catch (e: any) {
      setMessage(e.message);
    } finally { setSaving(null); }
  }

  if (loading) return <p className="text-foreground/60">Carregando links...</p>;

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold">Links de Redes Sociais</h3>
        <p className="text-xs text-foreground/50">Edite os links que aparecem no cabeçalho e rodapé do site.</p>
      </div>
      {message && <div className="rounded-md bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{message}</div>}
      {socialKeys.map((key) => {
        const item = items.find(i => i.key === key) || { key, value: "" };
        const label = key.replace("site_", "").charAt(0).toUpperCase() + key.replace("site_", "").slice(1);
        return (
          <div key={key} className="rounded-lg border border-border bg-ink-2 p-4">
            <label className="mb-2 block text-xs uppercase tracking-wide text-foreground/60 font-bold">{label}</label>
            <div className="flex gap-2">
              <input
                value={item.value}
                onChange={(e) => {
                  const val = e.target.value;
                  setItems(prev => {
                    const exists = prev.find(i => i.key === key);
                    if (exists) {
                      return prev.map(i => i.key === key ? { ...i, value: val } : i);
                    }
                    return [...prev, { key, value: val }];
                  });
                }}
                className="w-full rounded-md border border-border bg-ink px-3 py-2 text-sm text-foreground focus:border-brd/40 focus:outline-none"
                placeholder={`https://...`}
              />
              <button
                onClick={() => save(key, item.value)}
                disabled={saving === key}
                className="rounded-md bg-brd px-4 py-2 text-sm font-semibold text-cream disabled:opacity-50 min-w-[80px]"
              >
                {saving === key ? "..." : "Salvar"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ServicesTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try { setItems(await listServicesAdmin()); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  async function save(item: any) {
    try {
      await saveService({ data: item });
      setMessage("Salvo"); refresh();
    } catch (e: any) { setMessage(e.message); }
  }

  async function remove(id: string) {
    if (!confirm("Remover?")) return;
    await deleteService({ data: { id } });
    refresh();
  }

  if (loading) return <p className="text-foreground/60">Carregando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setItems([...items, { title: "Novo", description: "", active: true, order_index: items.length }])} className="inline-flex items-center gap-1 rounded-md bg-brd px-3 py-1.5 text-sm font-semibold text-cream">
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
      {items.map((s, idx) => (
        <ServiceCard key={s.id || idx} initial={s} onSave={save} onRemove={remove} />
      ))}
    </div>
  );
}

function ServiceCard({ initial, onSave, onRemove }: { initial: any; onSave: (s: any) => void; onRemove: (id: string) => void }) {
  const [s, setS] = useState(initial);
  return (
    <div className="rounded-lg border border-border bg-ink-2 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Título"><input value={s.title} onChange={(e) => setS({ ...s, title: e.target.value })} className={inputCls} /></Field>
        <Field label="Badge"><input value={s.badge || ""} onChange={(e) => setS({ ...s, badge: e.target.value })} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Descrição"><textarea value={s.description} onChange={(e) => setS({ ...s, description: e.target.value })} className={inputCls} /></Field>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        {s.id && <button onClick={() => onRemove(s.id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>}
        <button onClick={() => onSave(s)} className="rounded bg-brd px-3 py-1 text-xs text-white">Salvar</button>
      </div>
    </div>
  );
}

function TestimonialsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try { setItems(await listTestimonialsAdmin()); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  if (loading) return <p className="text-foreground/60">Carregando...</p>;

  return <div className="text-foreground/60">Em desenvolvimento (CRUD Depoimentos).</div>;
}

function LogosTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    setLoading(true);
    try { setItems(await listLogosAdmin()); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "client-logos");
      const { url } = await uploadAsset({ data: formData as any }) as { url: string };
      await saveLogo({ data: { name: file.name.split('.')[0], image_url: url, active: true, order_index: items.length } });
      refresh();
    } catch (err: any) { alert(err.message); }
    finally { setUploading(false); }
  }

  async function remove(id: string) {
    if (!confirm("Remover?")) return;
    await deleteLogo({ data: { id } });
    refresh();
  }

  if (loading) return <p className="text-foreground/60">Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Logos dos Clientes</h3>
        <label className="cursor-pointer rounded-md bg-brd px-4 py-2 text-sm font-semibold text-cream hover:bg-brd-light transition">
          {uploading ? "Enviando..." : "Subir Logo"}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((logo) => (
          <div key={logo.id} className="group relative rounded-xl border border-border bg-ink-2 p-4 flex flex-col items-center justify-center aspect-square">
            {logo.image_url ? (
              <img src={logo.image_url} alt={logo.name} className="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition" />
            ) : (
              <span className="text-xs text-foreground/40">{logo.name}</span>
            )}
            <button 
              onClick={() => remove(logo.id)}
              className="absolute -top-2 -right-2 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


function PortfolioTab({ filter }: { filter: "image" | "video" }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const rows = await listPortfolioSlidesAdmin();
      setItems(rows.filter((r: any) => r.media_type === filter));
    } finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, [filter]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "portfolio");
      const { url } = await uploadAsset({ data: formData as any }) as { url: string };
      await savePortfolioSlide({ data: { 
        media_type: filter, 
        media_url: url, 
        active: true, 
        order_index: items.length,
        caption: file.name.split('.')[0]
      } });
      refresh();
    } catch (err: any) { alert(err.message); }
    finally { setUploading(false); }
  }

  async function onSave(item: any) {
    await savePortfolioSlide({ data: item });
    refresh();
  }

  async function onRemove(id: string) {
    if (!confirm("Remover?")) return;
    await deletePortfolioSlide({ data: { id } });
    refresh();
  }

  if (loading) return <p className="text-foreground/60">Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{filter === "image" ? "Imagens" : "Vídeos"} do Portfólio</h3>
        <label className="cursor-pointer rounded-md bg-brd px-4 py-2 text-sm font-semibold text-cream hover:bg-brd-light transition">
          {uploading ? "Enviando..." : filter === "image" ? "Subir Imagem" : "Subir Vídeo"}
          <input type="file" accept={filter === "image" ? "image/*" : "video/*"} onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <div key={it.id || idx} className="rounded-lg border border-border bg-ink-2 p-4">
            <div className="mb-3 aspect-video overflow-hidden rounded bg-ink flex items-center justify-center border border-border">
              {filter === "image" ? (
                <img src={it.media_url} alt={it.caption} className="h-full w-full object-cover" />
              ) : (
                <video src={it.media_url} className="h-full w-full object-cover" controls />
              )}
            </div>
            <div className="space-y-3">
              <Field label="Legenda">
                <input 
                  value={it.caption || ""} 
                  onChange={(e) => { 
                    const next = [...items]; 
                    next[idx].caption = e.target.value; 
                    setItems(next); 
                  }} 
                  className={inputCls} 
                />
              </Field>
              <div className="flex justify-end gap-2">
                <button onClick={() => onRemove(it.id)} className="text-red-400 p-1 hover:bg-red-500/10 rounded"><Trash2 className="h-4 w-4" /></button>
                <button onClick={() => onSave(it)} className="rounded bg-brd px-4 py-1 text-xs text-white hover:bg-brd-light transition">Salvar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

