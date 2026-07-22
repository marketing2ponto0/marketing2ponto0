import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acesso Admin · Marketing 2.0" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Conta criada. Se o e-mail exigir confirmação, verifique sua caixa de entrada. Depois faça login.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      setError(err?.message || "Falha na autenticação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 text-black">
      <Link to="/" className="mb-6 text-sm text-black/60 hover:text-black">← Voltar ao site</Link>
      <h1 className="text-3xl font-bold tracking-tight">Área do Administrador</h1>
      <p className="mt-2 text-sm text-black/60">
        {mode === "signin" ? "Entre com seu e-mail e senha." : "Crie sua conta de administrador."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-black/60">E-mail</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-black/5 px-3 py-2 text-black placeholder-black/30 focus:border-black/40 focus:outline-none"
            placeholder="voce@marketing2ponto0.com.br"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-black/60">Senha</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-black/5 px-3 py-2 text-black placeholder-black/30 focus:border-black/40 focus:outline-none"
            placeholder="••••••••"
          />
        </label>

        {error && <p className="rounded-md bg-red-500/15 px-3 py-2 text-sm text-red-200">{error}</p>}
        {info && <p className="rounded-md bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-2.5 font-semibold text-white transition hover:bg-black/90 disabled:opacity-60"
        >
          {loading ? "Enviando..." : mode === "signin" ? "Entrar" : "Criar conta"}
        </button>

        <button
          type="button"
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
          className="w-full text-center text-sm text-black/60 hover:text-black"
        >
          {mode === "signin" ? "Não tem conta? Criar agora" : "Já tem conta? Entrar"}
        </button>
      </form>
    </div>
  );
}
