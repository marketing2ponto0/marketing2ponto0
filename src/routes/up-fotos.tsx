import { createFileRoute } from "@tanstack/react-router";
import { GrupoDetail } from "../components/site/grupo-detail";

export const Route = createFileRoute("/up-fotos")({
  head: () => ({
    meta: [
      { title: "UP Fotos e Vídeos — Grupo Marketing 2.0" },
      {
        name: "description",
        content:
          "Produção audiovisual completa: fotografia de produto, ensaios institucionais, reels e cobertura de eventos.",
      },
      { property: "og:title", content: "UP Fotos e Vídeos — Grupo Marketing 2.0" },
      {
        property: "og:description",
        content: "Fotografia, vídeos e reels que dão imagem forte à sua marca.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GrupoDetail name="UP Fotos e Vídeos" />,
});
