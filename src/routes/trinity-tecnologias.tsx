import { createFileRoute } from "@tanstack/react-router";
import { GrupoDetail } from "../components/site/grupo-detail";

export const Route = createFileRoute("/trinity-tecnologias")({
  head: () => ({
    meta: [
      { title: "Trinity Tecnologias — Grupo Marketing 2.0" },
      {
        name: "description",
        content:
          "Sites de alta conversão, landing pages, e-commerce e sistemas sob medida integrados ao marketing.",
      },
      { property: "og:title", content: "Trinity Tecnologias — Grupo Marketing 2.0" },
      {
        property: "og:description",
        content: "Tecnologia sob medida para o crescimento da sua marca.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GrupoDetail name="Trinity Tecnologias" />,
});
