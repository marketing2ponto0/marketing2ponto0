import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { getLeadsDashboard } from "@/lib/leads-dashboard.functions";

const dashboardQuery = queryOptions({
  queryKey: ["admin", "leads-dashboard"],
  queryFn: () => getLeadsDashboard(),
  staleTime: 30_000,
});

export const Route = createFileRoute("/admin")({
  ssr: false,
  loader: ({ context }) => context.queryClient.ensureQueryData(dashboardQuery),
  head: () => ({
    meta: [
      { title: "Painel de Leads · Marketing 2.0" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center text-white">
      <h1 className="text-2xl font-bold">Erro ao carregar o painel</h1>
      <p className="mt-3 text-white/70">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => <div className="p-8 text-white">Não encontrado.</div>,
  component: AdminPage,
});

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function AdminPage() {
  const router = useRouter();
  const { data } = useSuspenseQuery(dashboardQuery);
  const hasFailures = data.failedCount > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-white">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Leads</h1>
          <p className="mt-1 text-sm text-white/60">
            Últimos {data.total} contatos recebidos pelo formulário do site.
          </p>
        </div>
        <button
          onClick={() => router.invalidate()}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </button>
      </div>

      {hasFailures && (
        <div
          role="alert"
          className="mb-8 rounded-xl border border-red-500/40 bg-red-500/10 p-5 shadow-lg shadow-red-500/10"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-red-500/20 p-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-red-100">
                {data.failedCount} {data.failedCount === 1 ? "lead esgotou" : "leads esgotaram"} as
                tentativas de notificação por e-mail
              </h2>
              <p className="mt-1 text-sm text-red-100/80">
                Foram feitas {data.maxAttempts} tentativas de envio via Web3Forms sem sucesso. O
                contato está salvo no banco, mas o e-mail para{" "}
                <strong>contato@marketing2ponto0.com.br</strong> não chegou. Entre em contato
                manualmente com os leads abaixo.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total (últimos 100)" value={data.total} icon={null} tone="neutral" />
        <StatCard
          label="Notificados"
          value={data.notifiedCount}
          icon={<CheckCircle2 className="h-4 w-4" />}
          tone="success"
        />
        <StatCard
          label="Aguardando retry"
          value={data.pendingCount}
          icon={<Clock className="h-4 w-4" />}
          tone="warning"
        />
        <StatCard
          label="Falharam"
          value={data.failedCount}
          icon={<AlertTriangle className="h-4 w-4" />}
          tone="danger"
        />
      </div>

      {hasFailures && (
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Leads sem notificação</h2>
          <div className="overflow-hidden rounded-xl border border-red-500/30">
            <table className="w-full text-sm">
              <thead className="bg-red-500/10 text-left text-xs uppercase tracking-wide text-red-100/80">
                <tr>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Contato</th>
                  <th className="px-4 py-3">Serviço</th>
                  <th className="px-4 py-3">Tentativas</th>
                  <th className="px-4 py-3">Último erro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-red-500/5">
                {data.failed.map((l) => (
                  <tr key={l.id} className="align-top">
                    <td className="px-4 py-3 text-white/70">{formatDate(l.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{l.nome}</div>
                      {l.empresa && <div className="text-white/50">{l.empresa}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div>{l.email}</div>
                      {l.whatsapp && <div className="text-white/50">{l.whatsapp}</div>}
                    </td>
                    <td className="px-4 py-3 text-white/70">{l.servico || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-200">
                        {l.email_notification_attempts}/{data.maxAttempts}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/60">
                      {l.email_last_error || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-xl font-semibold">Todos os leads recentes</h2>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Status e-mail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.leads.map((l) => {
                const attempts = l.email_notification_attempts ?? 0;
                const failed = !l.email_notified && attempts >= data.maxAttempts;
                const pending = !l.email_notified && attempts < data.maxAttempts;
                return (
                  <tr key={l.id} className="align-top">
                    <td className="px-4 py-3 text-white/70">{formatDate(l.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{l.nome}</div>
                      {l.empresa && <div className="text-white/50">{l.empresa}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div>{l.email}</div>
                      {l.whatsapp && <div className="text-white/50">{l.whatsapp}</div>}
                    </td>
                    <td className="px-4 py-3 text-white/70">{l.servico || "—"}</td>
                    <td className="px-4 py-3">
                      {l.email_notified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" /> Notificado
                        </span>
                      ) : failed ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-200">
                          <AlertTriangle className="h-3 w-3" /> Falhou ({attempts}/{data.maxAttempts})
                        </span>
                      ) : pending ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-200">
                          <Clock className="h-3 w-3" /> {attempts}/{data.maxAttempts}
                        </span>
                      ) : (
                        <span className="text-white/40">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: "neutral" | "success" | "warning" | "danger";
}) {
  const tones: Record<typeof tone, string> = {
    neutral: "border-white/10 bg-white/5 text-white",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-100",
    danger: "border-red-500/30 bg-red-500/10 text-red-100",
  };
  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide opacity-80">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
