import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const FAIXA =
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/253050363&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false";

const SOUNDCLOUD_API = "https://w.soundcloud.com/player/api.js";

type SoundCloudWidget = {
  bind: (event: string, callback: () => void) => void;
  play: () => void;
  pause: () => void;
};

type SoundCloudWindow = Window & {
  SC?: {
    Widget: {
      Events: {
        READY: string;
        PLAY: string;
        PAUSE: string;
        FINISH: string;
      };
      (iframe: HTMLIFrameElement): SoundCloudWidget;
    };
  };
};

function carregarApiSoundCloud(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const win = window as SoundCloudWindow;

  if (win.SC?.Widget) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existente = document.querySelector<HTMLScriptElement>(
      `script[src="${SOUNDCLOUD_API}"]`,
    );

    if (existente) {
      existente.addEventListener("load", () => resolve(), { once: true });
      existente.addEventListener("error", () => reject(new Error("SoundCloud API falhou")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = SOUNDCLOUD_API;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("SoundCloud API falhou"));
    document.head.appendChild(script);
  });
}

export function Musica() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const [tocando, setTocando] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancelado = false;

    const inicializar = async () => {
      try {
        await carregarApiSoundCloud();

        if (cancelado || !playerRef.current) return;

        const win = window as SoundCloudWindow;
        if (!win.SC?.Widget) throw new Error("SoundCloud Widget API indisponível");

        const widget = win.SC.Widget(playerRef.current);
        widgetRef.current = widget;

        widget.bind(win.SC.Widget.Events.READY, () => {
          if (!cancelado) setPronto(true);
        });

        widget.bind(win.SC.Widget.Events.PLAY, () => {
          if (!cancelado) setTocando(true);
        });

        widget.bind(win.SC.Widget.Events.PAUSE, () => {
          if (!cancelado) setTocando(false);
        });

        widget.bind(win.SC.Widget.Events.FINISH, () => {
          if (!cancelado) {
            setTocando(false);
            widget.play();
          }
        });
      } catch {
        if (!cancelado) setErro(true);
      }
    };

    inicializar();

    return () => {
      cancelado = true;
      widgetRef.current = null;
    };
  }, []);

  const alternar = () => {
    const widget = widgetRef.current;

    if (!widget || !pronto) {
      setErro(true);
      window.setTimeout(() => setErro(false), 3200);
      return;
    }

    setErro(false);

    if (tocando) {
      widget.pause();
    } else {
      widget.play();
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
          A música ainda está carregando. Tente novamente. 🎵
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
        src={FAIXA}
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute h-px w-px opacity-0"
        tabIndex={-1}
      />
    </div>
  );
}
