import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * Player discreto com a música "Almas" do BK.
 * Envie o arquivo MP3 da música como asset e cole a URL aqui.
 */
const FAIXA = ""; // <- substitua pela URL do MP3 de "Almas - BK"

export function Musica() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.45;
    a.loop = true;
  }, []);

  const alternar = async () => {
    const a = audioRef.current;
    if (!a || !FAIXA) {
      setErro(true);
      window.setTimeout(() => setErro(false), 3200);
      return;
    }
    if (tocando) {
      a.pause();
      setTocando(false);
    } else {
      try {
        await a.play();
        setTocando(true);
      } catch {
        setErro(true);
      }
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
          Envie o MP3 de "Almas - BK" pra tocar aqui. 🎵
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

      {FAIXA && <audio ref={audioRef} src={FAIXA} preload="none" />}
    </div>
  );
}
