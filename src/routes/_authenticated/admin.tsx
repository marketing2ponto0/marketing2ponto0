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

type Tab = "leads" | "textos" | "servicos" | "depoimentos" | "logos" | "portfolio" | "videos";

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
    { key: "textos", label: "Textos" },
    { key: "servicos", label: "Serviços" },
    { key: "depoimentos", label: "Depoimentos" },
    { key: "logos", label: "Logos" },
    { key: "portfolio", label: "Portfólio (Imagens)" },
    { key: "videos", label: "Vídeos do Portfólio" },
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
      {tab === "textos" && <TextsTab />}
      {tab === "servicos" && <ServicesTab />}
      {tab === "depoimentos" && <TestimonialsTab />}
      {tab === "logos" && <LogosTab />}
      {tab === "portfolio" && <PortfolioTab filter="image" />}
      {tab === "videos" && <PortfolioTab filter="video" />}
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

  async function refresh() {
    setLoading(true);
    try { setItems(await listLogosAdmin()); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  if (loading) return <p className="text-foreground/60">Carregando...</p>;

  return <div className="text-foreground/60">Em desenvolvimento (CRUD Logos).</div>;
}

function PortfolioTab({ filter }: { filter: "image" | "video" }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const rows = await listPortfolioSlidesAdmin();
      setItems(rows.filter((r: any) => r.media_type === filter));
    } finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, [filter]);

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
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setItems([...items, { media_type: filter, media_url: "", caption: "", active: true, order_index: items.length }])} className="rounded bg-brd px-3 py-1 text-xs text-white">Adicionar</button>
      </div>
      {items.map((it, idx) => (
        <div key={it.id || idx} className="rounded-lg border border-border bg-ink-2 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="URL da Mídia"><input value={it.media_url} onChange={(e) => { const next = [...items]; next[idx].media_url = e.target.value; setItems(next); }} className={inputCls} /></Field>
            <Field label="Legenda"><input value={it.caption || ""} onChange={(e) => { const next = [...items]; next[idx].caption = e.target.value; setItems(next); }} className={inputCls} /></Field>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            {it.id && <button onClick={() => onRemove(it.id)} className="text-red-400"><Trash2 className="h-4 w-4" /></button>}
            <button onClick={() => onSave(it)} className="rounded bg-brd px-3 py-1 text-xs text-white">Salvar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
