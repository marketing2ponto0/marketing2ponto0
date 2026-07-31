import { createFileRoute } from "@tanstack/react-router";
import { GrupoDetail } from "../components/site/grupo-detail";

export const Route = createFileRoute("/midia-ooh-360")({
  head: () => ({
    meta: [
      { title: "Mídia OOH 360º — Grupo Marketing 2.0" },
      {
        name: "description",
        content:
          "TV e rádio indoor para comércios: programação gerenciada à distância, espaço publicitário e modelo de revenda.",
      },
      { property: "og:title", content: "Mídia OOH 360º — Grupo Marketing 2.0" },
      {
        property: "og:description",
        content: "TV e rádio indoor que transformam a tela do seu ponto de venda em mídia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GrupoDetail name="Mídia OOH 360º" />,
});
