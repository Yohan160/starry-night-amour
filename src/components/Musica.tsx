import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const VIDEO_ID = "c_wOcTwDU-c";
const YOUTUBE_API = "https://www.youtube.com/iframe_api";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy?: () => void;
};

type YouTubeWindow = Window & {
  YT?: {
    Player: new (
      element: HTMLIFrameElement,
      options: {
        videoId: string;
        playerVars?: Record<string, number | string>;
        events?: {
          onReady?: () => void;
          onStateChange?: (event: { data: number }) => void;
          onError?: () => void;
        };
      },
    ) => YouTubePlayer;
    PlayerState: {
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
    };
  };
  onYouTubeIframeAPIReady?: () => void;
};

function carregarApiYouTube(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const win = window as YouTubeWindow;
  if (win.YT?.Player) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const anterior = win.onYouTubeIframeAPIReady;

    win.onYouTubeIframeAPIReady = () => {
      anterior?.();
      resolve();
    };

    const existente = document.querySelector<HTMLScriptElement>(
      `script[src="${YOUTUBE_API}"]`,
    );

    if (existente) {
      const timeout = window.setTimeout(
        () => reject(new Error("YouTube API não carregou")),
        10000,
      );

      const verificar = () => {
        if (win.YT?.Player) {
          window.clearTimeout(timeout);
          resolve();
        }
      };

      existente.addEventListener("load", verificar, { once: true });
      existente.addEventListener("error", () => {
        window.clearTimeout(timeout);
        reject(new Error("YouTube API falhou"));
      }, { once: true });
      verificar();
      return;
    }

    const script = document.createElement("script");
    script.src = YOUTUBE_API;
    script.async = true;
    script.onload = () => {
      if (win.YT?.Player) resolve();
    };
    script.onerror = () => reject(new Error("YouTube API falhou"));
    document.head.appendChild(script);
  });
}

export function Musica() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const playerInstanceRef = useRef<YouTubePlayer | null>(null);
  const [tocando, setTocando] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancelado = false;

    const inicializar = async () => {
      try {
        await carregarApiYouTube();

        if (cancelado || !playerRef.current) return;

        const win = window as YouTubeWindow;
        if (!win.YT?.Player || !win.YT.PlayerState) {
          throw new Error("YouTube Player API indisponível");
        }

        const player = new win.YT.Player(playerRef.current, {
          videoId: VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              if (!cancelado) setPronto(true);
            },
            onStateChange: (event) => {
              if (cancelado) return;

              if (event.data === win.YT!.PlayerState.PLAYING) {
                setTocando(true);
                setErro(false);
              } else if (event.data === win.YT!.PlayerState.PAUSED) {
                setTocando(false);
              } else if (event.data === win.YT!.PlayerState.ENDED) {
                player.seekTo(0, true);
                player.playVideo();
              }
            },
            onError: () => {
              if (!cancelado) setErro(true);
            },
          },
        });

        playerInstanceRef.current = player;
      } catch {
        if (!cancelado) setErro(true);
      }
    };

    inicializar();

    return () => {
      cancelado = true;
      playerInstanceRef.current?.destroy?.();
      playerInstanceRef.current = null;
    };
  }, []);

  const alternar = () => {
    const player = playerInstanceRef.current;

    if (!player || !pronto) {
      setErro(true);
      window.setTimeout(() => setErro(false), 3200);
      return;
    }

    setErro(false);

    if (tocando) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-[90] flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      {erro && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-[14rem] rounded-2xl px-3 py-2 text-right font-sans text-[0.7rem] text-muted-foreground"
        >
          A música não conseguiu carregar. Tente novamente. 🎵
        </motion.span>
      )}

      <button
        type="button"
        onClick={alternar}
        aria-label={tocando ? "Pausar música" : "Tocar música"}
        aria-pressed={tocando}
        className="glass-card group relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full opacity-40 blur-lg transition-opacity group-hover:opacity-80"
          style={{ background: "var(--gradient-love)" }}
        />

        {tocando ? (
          <span className="flex items-end gap-[3px]" aria-hidden>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ height: [6, 16, 8, 14, 6] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                className="w-[3px] rounded-full bg-gold"
              />
            ))}
          </span>
        ) : (
          <span
            aria-hidden
            className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-gold"
          />
        )}
      </button>

      <iframe
        ref={playerRef}
        title="Player de áudio"
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute h-px w-px opacity-0"
        tabIndex={-1}
      />
    </div>
  );
}
