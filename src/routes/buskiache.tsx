import { createFileRoute } from "@tanstack/react-router";
import { GrupoDetail } from "../components/site/grupo-detail";

export const Route = createFileRoute("/buskiache")({
  head: () => ({
    meta: [
      { title: "Buskiache — Grupo Marketing 2.0" },
      {
        name: "description",
        content:
          "Guia comercial e aplicativo que conecta empresas locais a novos clientes na sua região.",
      },
      { property: "og:title", content: "Buskiache — Grupo Marketing 2.0" },
      {
        property: "og:description",
        content: "Mais visibilidade regional para o seu comércio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GrupoDetail name="Buskiache" />,
});
