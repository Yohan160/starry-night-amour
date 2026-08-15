import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { motivos } from "@/lib/textos";

export function Motivos() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <header className="mb-14 text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] text-gold/80 uppercase">
          a pergunta fácil
        </p>
        <h2 className="mt-3 font-display text-4xl text-love sm:text-6xl">Por que eu te amo?</h2>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm text-muted-foreground">
          Toque em cada motivo, amor. Tem mais coisa escrita dentro.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {motivos.map((m, i) => {
          const ativo = aberto === i;
          return (
            <motion.button
              key={m.titulo}
              type="button"
              layout
              onClick={() => setAberto(ativo ? null : i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -4 }}
              className={`glass-card group relative overflow-hidden rounded-3xl p-6 text-left transition-colors ${
                ativo ? "sm:col-span-2" : ""
              }`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: "var(--gradient-love)" }}
              />
              <span className="font-sans text-[0.55rem] tracking-[0.3em] text-gold/70 uppercase">
                motivo {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                {m.titulo}
              </h3>
              <AnimatePresence initial={false}>
                {ativo && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 max-w-2xl font-sans text-sm leading-[1.85] text-muted-foreground sm:text-base"
                  >
                    {m.texto}
                  </motion.p>
                )}
              </AnimatePresence>
              {!ativo && (
                <span className="mt-4 block font-sans text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
                  toque para abrir +
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
