import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAmbiente } from "@/lib/useAmbiente";

const FALAS = [
  "Feliz aniversário, meu amor. ❤️",
  "Obrigado por existir, Anny.",
  "Eu te amo.",
];

export function Finale() {
  const [aberto, setAberto] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const { leve, reduzido } = useAmbiente();

  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = "hidden";
    const timers = FALAS.map((_, i) =>
      window.setTimeout(() => setEtapa(i + 1), 1400 + i * 2600),
    );
    return () => {
      document.body.style.overflow = "";
      timers.forEach(clearTimeout);
    };
  }, [aberto]);

  const confetes = useMemo(
    () =>
      Array.from({ length: leve ? 40 : 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2.5,
        dur: 3.5 + Math.random() * 4,
        cor: [
          "var(--rose-love)",
          "var(--magic)",
          "var(--eye-sky)",
          "var(--eye-mint)",
          "var(--gold)",
          "var(--blush)",
        ][i % 6],
        larg: 4 + Math.random() * 6,
        alt: 8 + Math.random() * 12,
      })),
    [leve],
  );

  return (
    <>
      <section className="relative px-5 pt-10 pb-32 text-center">
        <motion.button
          type="button"
          onClick={() => setAberto(true)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-3 rounded-full border border-gold/40 px-9 py-5 font-sans text-sm tracking-[0.2em] text-foreground uppercase"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full opacity-45 blur-xl transition-opacity duration-700 group-hover:opacity-90"
            style={{ background: "var(--gradient-love)" }}
          />
          ainda não acabou...
        </motion.button>
        <p className="mt-6 font-sans text-xs text-muted-foreground">
          (toque, amor — tem mais uma coisa)
        </p>
      </section>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden px-6"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--magic) 35%, var(--background)), var(--background) 70%)",
            }}
          >
            {!reduzido &&
              confetes.map((c) => (
                <motion.span
                  key={c.id}
                  initial={{ y: "-15vh", opacity: 0, rotate: 0 }}
                  animate={{ y: "115vh", opacity: [0, 1, 1, 0], rotate: 720 }}
                  transition={{ duration: c.dur, delay: c.delay, repeat: Infinity }}
                  className="absolute top-0 rounded-[2px]"
                  style={{
                    left: `${c.x}%`,
                    width: c.larg,
                    height: c.alt,
                    background: c.cor,
                    boxShadow: `0 0 12px ${c.cor}`,
                  }}
                />
              ))}

            <div className="relative z-10 text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.5, filter: "blur(30px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[40vw] leading-none text-love sm:text-[18rem]"
              >
                17
              </motion.p>

              <div className="mt-2 min-h-40 space-y-3">
                {FALAS.slice(0, etapa).map((f, i) => (
                  <motion.p
                    key={f}
                    initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.3 }}
                    className={`font-display leading-tight ${
                      i === 2
                        ? "text-4xl text-love sm:text-6xl"
                        : "text-2xl text-foreground sm:text-4xl"
                    }`}
                  >
                    {f}
                  </motion.p>
                ))}
              </div>

              {etapa >= FALAS.length && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 1 }}
                  onClick={() => {
                    setAberto(false);
                    setEtapa(0);
                  }}
                  className="mt-10 rounded-full border border-gold/40 px-6 py-3 font-sans text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  voltar
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
