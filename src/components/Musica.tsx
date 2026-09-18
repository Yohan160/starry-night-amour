import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const FAIXA =
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A253050363&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false";

export function Musica() {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const receberEvento = (event: MessageEvent) => {
      if (event.origin !== "https://w.soundcloud.com" || typeof event.data !== "string") return;
      try {
        const data = JSON.parse(event.data) as { method?: string };
        if (data.method === "finish") {
          playerRef.current?.contentWindow?.postMessage(JSON.stringify({ method: "play" }), "https://w.soundcloud.com");
        }
      } catch {
        // Ignora mensagens externas que não pertencem ao player.
      }
    };
    window.addEventListener("message", receberEvento);
    return () => window.removeEventListener("message", receberEvento);
  }, []);

  const alternar = () => {
    const player = playerRef.current?.contentWindow;
    if (!player) {
      setErro(true);
      window.setTimeout(() => setErro(false), 3200);
      return;
    }
    player.postMessage(
      JSON.stringify({ method: tocando ? "pause" : "play" }),
      "https://w.soundcloud.com",
    );
    setTocando((atual) => !atual);
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
        className="glass-card group relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full opacity-40 blur-lg transition-opacity group-hover:opacity-80"
          style={{ background: "var(--gradient-love)" }}
        />
        {tocando ? (
          <span className="flex items-end gap-[3px]">
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
          <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-gold" />
        )}
      </button>

      <iframe
        ref={playerRef}
        title="Menina Fulô — Claudya"
        src={FAIXA}
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />
    </div>
  );
}
