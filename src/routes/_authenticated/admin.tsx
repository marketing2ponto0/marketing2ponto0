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

/* ---------------- LEADS ---------------- */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

function LeadsTab() {
  const router = useRouter();
  const [data, setData] = useState<Awaited<ReturnType<typeof getLeadsDashboard>> | null>(null);
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
            {data.leads.map((l) => {
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

/* ---------------- TEXTOS ---------------- */
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
      <p className="text-sm text-foreground/60">Edite qualquer campo e clique em salvar. Estes textos ficam disponíveis para a home ler do banco.</p>
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
        className="w-full rounded-md border border-border bg-ink px-3 py-2 text-sm text-foreground focus:border-brd/40 focus:outline-none"
      />
    </div>
  );
}

/* ---------------- SERVIÇOS ---------------- */
type ServiceRow = { id?: string; title: string; description: string; badge: string | null; icon: string | null; order_index: number; active: boolean };

function ServicesTab() {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const rows = await listServicesAdmin();
      setItems(rows as ServiceRow[]);
    } finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  function addNew() {
    setItems([...items, { title: "Novo serviço", description: "", badge: "", icon: "", order_index: items.length + 1, active: true }]);
  }

  async function save(item: ServiceRow) {
    try {
      await saveService({ data: item as any });
      setMessage("Salvo");
      setTimeout(() => setMessage(null), 1500);
      refresh();
    } catch (e: any) { setMessage(e.message); }
  }

  async function remove(id?: string) {
    if (!id) { refresh(); return; }
    if (!confirm("Remover este serviço?")) return;
    await deleteService({ data: { id } });
    refresh();
  }

  if (loading) return <p className="text-foreground/60">Carregando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">Gerencie os serviços exibidos no site.</p>
        <button onClick={addNew} className="inline-flex items-center gap-1 rounded-md bg-brd px-3 py-1.5 text-sm font-semibold text-cream">
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
      {message && <div className="rounded-md bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{message}</div>}
      {items.map((s, idx) => (
        <ServiceCard key={s.id ?? `new-${idx}`} initial={s} onSave={save} onRemove={remove} />
      ))}
    </div>
  );
}

function ServiceCard({ initial, onSave, onRemove }: { initial: ServiceRow; onSave: (s: ServiceRow) => void; onRemove: (id?: string) => void }) {
  const [s, setS] = useState<ServiceRow>(initial);
  return (
    <div className="rounded-lg border border-border bg-ink-2 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Título"><input value={s.title} onChange={(e) => setS({ ...s, title: e.target.value })} className={inputCls} /></Field>
        <Field label="Badge"><input value={s.badge ?? ""} onChange={(e) => setS({ ...s, badge: e.target.value })} className={inputCls} /></Field>
        <Field label="Ícone (nome lucide)"><input value={s.icon ?? ""} onChange={(e) => setS({ ...s, icon: e.target.value })} className={inputCls} placeholder="target, search, palette..." /></Field>
        <Field label="Ordem"><input type="number" value={s.order_index} onChange={(e) => setS({ ...s, order_index: parseInt(e.target.value) || 0 })} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Descrição"><textarea rows={2} value={s.description} onChange={(e) => setS({ ...s, description: e.target.value })} className={inputCls} /></Field>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-foreground/70">
          <input type="checkbox" checked={s.active} onChange={(e) => setS({ ...s, active: e.target.checked })} /> Ativo
        </label>
        <div className="flex gap-2">
          <button onClick={() => onRemove(s.id)} className="inline-flex items-center gap-1 rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-300 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" /> Remover
          </button>
          <button onClick={() => onSave(s)} className="inline-flex items-center gap-1 rounded-md bg-brd px-3 py-1.5 text-sm font-semibold text-cream">
            <Save className="h-4 w-4" /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- DEPOIMENTOS ---------------- */
type TestimonialRow = { id?: string; name: string; role: string | null; quote: string; image_url: string | null; order_index: number; active: boolean };

function TestimonialsTab() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try { setItems((await listTestimonialsAdmin()) as TestimonialRow[]); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  function addNew() {
    setItems([...items, { name: "", role: "", quote: "", image_url: "", order_index: items.length + 1, active: true }]);
  }

  async function save(t: TestimonialRow) {
    try {
      await saveTestimonial({ data: t as any });
      setMessage("Salvo"); setTimeout(() => setMessage(null), 1500); refresh();
    } catch (e: any) { setMessage(e.message); }
  }

  async function remove(id?: string) {
    if (!id) { refresh(); return; }
    if (!confirm("Remover?")) return;
    await deleteTestimonial({ data: { id } });
    refresh();
  }

  if (loading) return <p className="text-foreground/60">Carregando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">Depoimentos exibidos no site.</p>
        <button onClick={addNew} className="inline-flex items-center gap-1 rounded-md bg-brd px-3 py-1.5 text-sm font-semibold text-cream">
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
      {message && <div className="rounded-md bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{message}</div>}
      {items.map((t, idx) => (
        <TestimonialCard key={t.id ?? `new-${idx}`} initial={t} onSave={save} onRemove={remove} />
      ))}
    </div>
  );
}

function TestimonialCard({ initial, onSave, onRemove }: { initial: TestimonialRow; onSave: (t: TestimonialRow) => void; onRemove: (id?: string) => void }) {
  const [t, setT] = useState<TestimonialRow>(initial);
  return (
    <div className="rounded-lg border border-border bg-ink-2 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Nome"><input value={t.name} onChange={(e) => setT({ ...t, name: e.target.value })} className={inputCls} /></Field>
        <Field label="Cargo / Empresa"><input value={t.role ?? ""} onChange={(e) => setT({ ...t, role: e.target.value })} className={inputCls} /></Field>
        <Field label="URL da foto"><input value={t.image_url ?? ""} onChange={(e) => setT({ ...t, image_url: e.target.value })} className={inputCls} placeholder="https://..." /></Field>
        <Field label="Ordem"><input type="number" value={t.order_index} onChange={(e) => setT({ ...t, order_index: parseInt(e.target.value) || 0 })} className={inputCls} /></Field>
        <div className="md:col-span-2">
          <Field label="Depoimento"><textarea rows={3} value={t.quote} onChange={(e) => setT({ ...t, quote: e.target.value })} className={inputCls} /></Field>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-foreground/70">
          <input type="checkbox" checked={t.active} onChange={(e) => setT({ ...t, active: e.target.checked })} /> Ativo
        </label>
        <div className="flex gap-2">
          <button onClick={() => onRemove(t.id)} className="inline-flex items-center gap-1 rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-300 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" /> Remover
          </button>
          <button onClick={() => onSave(t)} className="inline-flex items-center gap-1 rounded-md bg-brd px-3 py-1.5 text-sm font-semibold text-cream">
            <Save className="h-4 w-4" /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- LOGOS ---------------- */
type LogoRow = { id?: string; name: string; image_url: string | null; order_index: number; active: boolean };

function LogosTab() {
  const [items, setItems] = useState<LogoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try { setItems((await listLogosAdmin()) as LogoRow[]); }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  function addNew() {
    setItems([...items, { name: "", image_url: "", order_index: items.length + 1, active: true }]);
  }

  async function save(l: LogoRow) {
    try {
      await saveLogo({ data: l as any });
      setMessage("Salvo"); setTimeout(() => setMessage(null), 1500); refresh();
    } catch (e: any) { setMessage(e.message); }
  }

  async function remove(id?: string) {
    if (!id) { refresh(); return; }
    if (!confirm("Remover?")) return;
    await deleteLogo({ data: { id } });
    refresh();
  }

  if (loading) return <p className="text-black/60">Carregando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-black/60">Logos de clientes na faixa do site.</p>
        <button onClick={addNew} className="inline-flex items-center gap-1 rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
      {message && <div className="rounded-md bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{message}</div>}
      {items.map((l, idx) => (
        <LogoCard key={l.id ?? `new-${idx}`} initial={l} onSave={save} onRemove={remove} />
      ))}
    </div>
  );
}

function LogoCard({ initial, onSave, onRemove }: { initial: LogoRow; onSave: (l: LogoRow) => void; onRemove: (id?: string) => void }) {
  const [l, setL] = useState<LogoRow>(initial);
  return (
    <div className="rounded-lg border border-black/10 bg-black/5 p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Field label="Nome"><input value={l.name} onChange={(e) => setL({ ...l, name: e.target.value })} className={inputCls} /></Field>
        <div className="md:col-span-2"><Field label="URL da imagem"><input value={l.image_url ?? ""} onChange={(e) => setL({ ...l, image_url: e.target.value })} className={inputCls} placeholder="https://..." /></Field></div>
        <Field label="Ordem"><input type="number" value={l.order_index} onChange={(e) => setL({ ...l, order_index: parseInt(e.target.value) || 0 })} className={inputCls} /></Field>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-black/70">
          <input type="checkbox" checked={l.active} onChange={(e) => setL({ ...l, active: e.target.checked })} /> Ativo
        </label>
        <div className="flex gap-2">
          <button onClick={() => onRemove(l.id)} className="inline-flex items-center gap-1 rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-300 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" /> Remover
          </button>
          <button onClick={() => onSave(l)} className="inline-flex items-center gap-1 rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white">
            <Save className="h-4 w-4" /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PORTFÓLIO ---------------- */
type SlideRow = {
  id?: string;
  media_type: "image" | "video";
  media_url: string;
  poster_url: string | null;
  caption: string | null;
  order_index: number;
  active: boolean;
};

async function uploadPortfolioFile(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `slides/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("portfolio").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);
  return path;
}

function PortfolioTab({ filter }: { filter?: "image" | "video" }) {
  const [items, setItems] = useState<SlideRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try { 
      const res = (await listPortfolioSlidesAdmin()) as SlideRow[];
      setItems(filter ? res.filter(item => item.media_type === filter) : res);
    }
    finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);

  function addNew() {
    setItems([
      ...items,
      { media_type: filter || "image", media_url: "", poster_url: null, caption: "", order_index: items.length + 1, active: true },
    ]);
  }

  async function save(s: SlideRow) {
    try {
      if (!s.media_url) { setMessage("Envie um arquivo antes de salvar."); return; }
      await savePortfolioSlide({ data: s as any });
      setMessage("Salvo"); setTimeout(() => setMessage(null), 1500); refresh();
    } catch (e: any) { setMessage(e.message); }
  }

  async function remove(id?: string) {
    if (!id) { refresh(); return; }
    if (!confirm("Remover este slide?")) return;
    await deletePortfolioSlide({ data: { id } });
    refresh();
  }

  if (loading) return <p className="text-black/60">Carregando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-black/60">
          {filter === "video" 
            ? "Gerencie os vídeos MP4 do portfólio. A ordem define a sequência da apresentação."
            : "Envie cada página do portfólio como imagem. A ordem define a sequência."}
        </p>
        <button onClick={addNew} className="inline-flex shrink-0 items-center gap-1 rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
      {message && <div className="rounded-md bg-emerald-500/15 px-3 py-2 text-sm text-emerald-800">{message}</div>}
      {items.map((s, idx) => (
        <SlideCard key={s.id ?? `new-${idx}`} initial={s} onSave={save} onRemove={remove} />
      ))}
    </div>
  );
}

function SlideCard({ initial, onSave, onRemove }: { initial: SlideRow; onSave: (s: SlideRow) => void; onRemove: (id?: string) => void }) {
  const [s, setS] = useState<SlideRow>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>, field: "media_url" | "poster_url") {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr(null);
    try {
      const path = await uploadPortfolioFile(file);
      setS((prev) => ({
        ...prev,
        [field]: path,
        ...(field === "media_url" ? { media_type: file.type.startsWith("video") ? "video" : "image" } : {}),
      }) as SlideRow);
    } catch (e: any) { setErr(e.message); }
    finally { setBusy(false); e.target.value = ""; }
  }

  return (
    <div className="rounded-lg border border-black/10 bg-black/5 p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <Field label="Tipo">
          <select value={s.media_type} onChange={(e) => setS({ ...s, media_type: e.target.value as "image" | "video" })} className={inputCls}>
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
          </select>
        </Field>
        <Field label="Ordem">
          <input type="number" value={s.order_index} onChange={(e) => setS({ ...s, order_index: parseInt(e.target.value) || 0 })} className={inputCls} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Legenda (opcional)">
            <input value={s.caption ?? ""} onChange={(e) => setS({ ...s, caption: e.target.value })} className={inputCls} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label={s.media_type === "video" ? "Arquivo de vídeo (MP4)" : "Arquivo de imagem"}>
            <input type="file" accept={s.media_type === "video" ? "video/*" : "image/*"} onChange={(e) => handleFile(e, "media_url")} className="w-full text-sm" />
          </Field>
          <p className="mt-1 truncate text-xs text-black/50">{s.media_url || "Nenhum arquivo enviado"}</p>
        </div>
        {s.media_type === "video" && (
          <div className="md:col-span-2">
            <Field label="Capa do vídeo (opcional)">
              <input type="file" accept="image/*" onChange={(e) => handleFile(e, "poster_url")} className="w-full text-sm" />
            </Field>
            <p className="mt-1 truncate text-xs text-black/50">{s.poster_url || "Sem capa"}</p>
          </div>
        )}
      </div>
      {busy && <p className="mt-2 text-xs text-black/60">Enviando arquivo...</p>}
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
      <div className="mt-3 flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-black/70">
          <input type="checkbox" checked={s.active} onChange={(e) => setS({ ...s, active: e.target.checked })} /> Ativo
        </label>
        <div className="flex gap-2">
          <button onClick={() => onRemove(s.id)} className="inline-flex items-center gap-1 rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" /> Remover
          </button>
          <button disabled={busy} onClick={() => onSave(s)} className="inline-flex items-center gap-1 rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50">
            <Save className="h-4 w-4" /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI helpers ---------------- */
const inputCls = "w-full rounded-md border border-black/10 bg-white/30 px-3 py-2 text-sm text-black focus:border-black/40 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wide text-black/60">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "neutral" | "success" | "warning" | "danger" }) {
  const tones: Record<typeof tone, string> = {
    neutral: "border-black/10 bg-black/5 text-black",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-100",
    danger: "border-red-500/30 bg-red-500/10 text-red-100",
  };
  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <div className="text-xs uppercase tracking-wide opacity-80">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "success" | "warning" | "danger"; children: React.ReactNode }) {
  const tones: Record<typeof tone, string> = {
    success: "bg-emerald-500/15 text-emerald-300",
    warning: "bg-amber-500/15 text-amber-200",
    danger: "bg-red-500/20 text-red-200",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
