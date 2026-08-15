import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAmbiente } from "@/lib/useAmbiente";

const FRASES = [
  "Hoje não é apenas mais um dia.",
  "Hoje é o dia em que o mundo ganhou uma pessoa incrível.",
  "Feliz aniversário, meu amor. ❤️",
];

/** Abertura cinematográfica: escuro → partículas → frases → o site nasce. */
export function Intro({ aoTerminar }: { aoTerminar: () => void }) {
  const { reduzido, leve } = useAmbiente();
  const [etapa, setEtapa] = useState(-1);
  const [saindo, setSaindo] = useState(false);
  const [iniciou, setIniciou] = useState(false);

  useEffect(() => {
    if (!iniciou) return;
    if (reduzido) {
      aoTerminar();
      return;
    }
    const tempos = [700, 3400, 6300, 9400, 11200];
    const timers = [
      ...FRASES.map((_, i) => window.setTimeout(() => setEtapa(i), tempos[i]!)),
      window.setTimeout(() => setSaindo(true), tempos[3]!),
      window.setTimeout(aoTerminar, tempos[4]!),
    ];
    return () => timers.forEach(clearTimeout);
  }, [iniciou, reduzido, aoTerminar]);

  const brilhos = Array.from({ length: leve ? 18 : 40 }, (_, i) => i);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        animate={{ opacity: saindo ? 0 : 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background px-6"
      >
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: iniciou ? 0.9 : 0.25, scale: iniciou ? 1.25 : 0.8 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute h-[70vmax] w-[70vmax] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--magic) 30%, transparent), color-mix(in oklab, var(--rose-love) 18%, transparent) 40%, transparent 68%)",
          }}
        />

        {iniciou &&
          brilhos.map((i) => (
            <motion.span
              key={i}
              aria-hidden
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: [0, 1, 0], y: -120 - Math.random() * 200 }}
              transition={{
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${55 + Math.random() * 45}%`,
                background: i % 3 === 0 ? "var(--gold)" : "var(--eye-sky)",
                boxShadow: "0 0 12px currentColor",
              }}
            />
          ))}

        {!iniciou ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4 }}
            className="relative z-10 text-center"
          >
            <p className="font-sans text-[0.65rem] tracking-[0.5em] text-muted-foreground uppercase">
              feito só para você
            </p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-love sm:text-6xl">
              Anny Beatriz
            </h1>
            <button
              type="button"
              onClick={() => setIniciou(true)}
              className="group relative mt-10 inline-flex items-center gap-3 rounded-full border border-gold/40 px-8 py-4 font-sans text-sm tracking-[0.18em] text-foreground uppercase transition-all duration-500 hover:border-gold hover:tracking-[0.28em]"
            >
              <span
                className="absolute inset-0 -z-10 rounded-full opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-80"
                style={{ background: "var(--gradient-love)" }}
              />
              começar
            </button>
            <p className="mt-6 font-sans text-xs text-muted-foreground">
              (é melhor com o som ligado, amor)
            </p>
          </motion.div>
        ) : (
          <div className="relative z-10 flex min-h-[8rem] items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {etapa >= 0 && (
                <motion.p
                  key={etapa}
                  initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`max-w-[22ch] font-display text-3xl leading-tight sm:text-5xl ${
                    etapa === 2 ? "text-love" : "text-foreground"
                  }`}
                >
                  {FRASES[etapa]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
