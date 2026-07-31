import { createFileRoute } from "@tanstack/react-router";
import { GrupoDetail } from "../components/site/grupo-detail";

export const Route = createFileRoute("/venda-no-link")({
  head: () => ({
    meta: [
      { title: "Venda no Link — Grupo Marketing 2.0" },
      {
        name: "description",
        content:
          "Catálogo digital, link único e checkout rápido com pedidos direto no WhatsApp para quem vende pelas redes sociais.",
      },
      { property: "og:title", content: "Venda no Link — Grupo Marketing 2.0" },
      {
        property: "og:description",
        content: "Venda direto pelo link: catálogo, checkout e pedidos no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GrupoDetail name="Venda no Link" />,
});
