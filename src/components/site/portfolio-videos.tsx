import { Play } from "lucide-react";
import { PORTFOLIO_VIDEOS, embedUrl, type PortfolioVideo } from "@/lib/portfolio-videos";

function ratioClass(v: PortfolioVideo) {
  return v.ratio === "landscape" ? "aspect-video" : "aspect-[9/16]";
}

export function VideoPlayer({ video }: { video: PortfolioVideo }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-black/10 bg-black shadow-xl">
      <div className={`relative w-full ${ratioClass(video)}`}>
        {video.kind === "mp4" ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <iframe
            src={embedUrl(video)}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
      </div>
      <figcaption className="bg-[var(--brd)] px-4 py-3 text-sm font-bold text-white">
        {video.title}
      </figcaption>
    </figure>
  );
}

/** Bloco de vídeos reais que substitui a página estática do PDF. */
export function VideoGallery() {
  if (PORTFOLIO_VIDEOS.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 py-16 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] text-black">
          <Play className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-extrabold text-white">Vídeos para redes sociais</h3>
        <p className="max-w-md text-sm text-white/80">
          Os players entram aqui assim que os vídeos (MP4) ou links de YouTube / Instagram forem
          adicionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
      {PORTFOLIO_VIDEOS.map((v) => (
        <VideoPlayer key={v.title} video={v} />
      ))}
    </div>
  );
}
