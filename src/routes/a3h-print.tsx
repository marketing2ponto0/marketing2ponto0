import { createFileRoute } from "@tanstack/react-router";
import { GrupoDetail } from "../components/site/grupo-detail";

export const Route = createFileRoute("/a3h-print")({
  head: () => ({
    meta: [
      { title: "A3H Print — Grupo Marketing 2.0" },
      {
        name: "description",
        content:
          "Comunicação impressa e visual com acabamento premium: cartões, banners, adesivos e fachadas.",
      },
      { property: "og:title", content: "A3H Print — Grupo Marketing 2.0" },
      {
        property: "og:description",
        content: "Do cartão de visita à fachada, sua marca consistente no físico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GrupoDetail name="A3H Print" />,
});
