export type PortfolioVideo = {
  /** Título exibido acima do player */
  title: string;
  /**
   * Fonte do vídeo:
   * - "youtube": use o ID do vídeo (ex.: "dQw4w9WgXcQ")
   * - "vimeo": use o ID numérico (ex.: "76979871")
   * - "instagram": use a URL do reel/post (ex.: "https://www.instagram.com/reel/XXXX/")
   * - "mp4": use a URL direta do arquivo (ou o .url de um asset)
   */
  kind: "youtube" | "vimeo" | "instagram" | "mp4";
  src: string;
  /** Imagem de capa (opcional, usada em mp4) */
  poster?: string;
  /** "vertical" para reels/stories (9:16), "landscape" para 16:9 */
  ratio?: "vertical" | "landscape";
};

/** Índice (base 0) da página do PDF que fala de "Vídeos para redes sociais". */
export const VIDEO_SLIDE_INDEX = 6;

/**
 * Adicione aqui os vídeos reais do portfólio.
 * Exemplos:
 *   { title: "Reel — Cafeteria Jundiaí", kind: "instagram", src: "https://www.instagram.com/reel/ABC123/" }
 *   { title: "Institucional", kind: "youtube", src: "dQw4w9WgXcQ", ratio: "landscape" }
 *   { title: "Story animado", kind: "mp4", src: "https://.../story.mp4" }
 */
export const PORTFOLIO_VIDEOS: PortfolioVideo[] = [];

export function embedUrl(v: PortfolioVideo): string {
  if (v.kind === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${v.src}?rel=0&modestbranding=1`;
  }
  if (v.kind === "vimeo") return `https://player.vimeo.com/video/${v.src}`;
  const clean = v.src.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed/`;
}
