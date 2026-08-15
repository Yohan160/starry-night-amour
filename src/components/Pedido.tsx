import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAmbiente } from "@/lib/useAmbiente";

const FALAS = [
  "Eu espero que todos os seus desejos encontrem um caminho até você.",
  "E espero poder estar do seu lado pra ver muitos deles se realizarem.",
];

export function Pedido() {
  const [apagada, setApagada] = useState(false);
  const { leve } = useAmbiente();

  return (
    <section className="relative overflow-hidden px-5 py-28 sm:py-36">
      <motion.div
        aria-hidden
        animate={{ opacity: apagada ? 0.85 : 0.35, scale: apagada ? 1.3 : 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent), color-mix(in oklab, var(--magic) 16%, transparent) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] text-gold/80 uppercase">
          momento especial
        </p>
        <h2 className="mt-3 font-display text-4xl text-love sm:text-6xl">Faça um pedido ✨</h2>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm text-muted-foreground">
          {apagada
            ? "Pronto, amor. Agora é com o universo."
            : "Fecha os olhos por um segundo. Depois toque na chama."}
        </p>

        <button
          type="button"
          onClick={() => setApagada(true)}
          aria-label={apagada ? "Vela apagada" : "Apagar a vela e fazer um pedido"}
          className="group relative mx-auto mt-12 block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
        >
          {/* chama */}
          <AnimatePresence>
            {!apagada && (
              <motion.span
                exit={{ opacity: 0, scale: 0.2, y: -30 }}
                transition={{ duration: 0.7 }}
                className="absolute -top-14 left-1/2 -translate-x-1/2"
              >
                <span className="animate-flame block h-12 w-7 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-gold via-rose-love to-blush opacity-95 blur-[1px]" />
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 scale-[3] rounded-full blur-2xl"
                  style={{ background: "color-mix(in oklab, var(--gold) 45%, transparent)" }}
                />
              </motion.span>
            )}
          </AnimatePresence>

          {/* fumaça */}
          <AnimatePresence>
            {apagada &&
              Array.from({ length: leve ? 4 : 8 }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.5, y: -20, x: 0, scale: 0.6 }}
                  animate={{ opacity: 0, y: -140 - i * 14, x: (i % 2 ? 1 : -1) * (14 + i * 5) }}
                  transition={{ duration: 2.6, delay: i * 0.12 }}
                  className="absolute -top-12 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-foreground/25 blur-md"
                />
              ))}
          </AnimatePresence>

          {/* bolo */}
          <span className="relative block">
            <span className="mx-auto block h-14 w-2.5 rounded-full bg-gradient-to-b from-blush to-wine" />
            <span className="mt-1 block h-16 w-44 rounded-t-xl bg-gradient-to-b from-magic/70 to-wine/90 ring-1 ring-gold/40 sm:w-56" />
            <span className="block h-20 w-56 rounded-b-2xl rounded-t-md bg-gradient-to-b from-rose-love/70 to-wine ring-1 ring-gold/30 sm:w-72" />
          </span>
        </button>

        <div className="mt-14 min-h-24 space-y-4">
          <AnimatePresence>
            {apagada &&
              FALAS.map((f, i) => (
                <motion.p
                  key={f}
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.3, delay: 0.8 + i * 1.2 }}
                  className="mx-auto max-w-xl font-display text-xl leading-snug text-foreground sm:text-3xl"
                >
                  {f}
                </motion.p>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
