import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter, WhatsAppFloat } from "../components/site/chrome";
import { getPublicSettings } from "@/lib/settings.functions";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não pôde ser carregada
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Você pode tentar atualizar a página ou voltar para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async ({ context }) => {
    try {
      return await context.queryClient.ensureQueryData({
        queryKey: ["site-settings"],
        queryFn: () => getPublicSettings(),
      });
    } catch (err) {
      console.error("[RootRoute] Loader failed:", err);
      return [];
    }
  },
  head: () => ({

    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Marketing 2.0 — Muito mais que uma agência" },
      {
        name: "description",
        content:
          "Agência especializada em mídias sociais e crescimento digital. Criatividade, dados e tráfego pago já incluso para resultados reais.",
      },
      { property: "og:title", content: "Marketing 2.0 — Muito mais que uma agência" },
      {
        property: "og:description",
        content:
          "Estratégia, performance e conteúdo diário para escalar sua marca.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap&font-display=swap",
      },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { queryClient } = Route.useRouteContext();

  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const router = useRouter();

  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => getPublicSettings(),
  });
  
  // Lógica para lidar com redirecionamento de hash legados (#admin -> /admin)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === "#admin") {
      router.navigate({ to: "/admin" });
    }
  }, [router]);

  useEffect(() => {
    const faviconUrl = settings?.find((s: any) => s.key === "site_favicon_url")?.value;
    if (faviconUrl && typeof document !== 'undefined') {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [settings]);

  const isAuthPage = router.state.location.pathname.startsWith("/auth") || 
                     router.state.location.pathname.startsWith("/_authenticated") ||
                     router.state.location.pathname === "/admin";

  return (
    <div className="min-h-screen flex flex-col text-foreground">
      {!isAuthPage && <SiteHeader />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAuthPage && <SiteFooter />}
      {!isAuthPage && <WhatsAppFloat />}
    </div>
  );
}

