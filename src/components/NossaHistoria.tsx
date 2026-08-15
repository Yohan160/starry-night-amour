import { motion } from "motion/react";
import { linhaDoTempo } from "@/lib/textos";
import { fotos } from "@/lib/fotos";

/**
 * Linha do tempo preparada para receber novos momentos:
 * basta adicionar itens em `linhaDoTempo` (src/lib/textos.ts).
 */
export function NossaHistoria() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 py-24 sm:py-32">
      <header className="mb-16 text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] text-gold/80 uppercase">
          nossa história
        </p>
        <h2 className="mt-3 font-display text-4xl text-love sm:text-6xl">
          Quando tudo começou...
        </h2>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm text-muted-foreground">
          E os momentos que foram virando memória sem a gente perceber.
        </p>
      </header>

      <div className="relative">
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-3 w-px sm:left-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--magic) 60%, transparent), color-mix(in oklab, var(--rose-love) 60%, transparent), transparent)",
          }}
        />

        <ol className="space-y-12 sm:space-y-20">
          {linhaDoTempo.map((item, i) => {
            const foto = fotos[(i * 3 + 2) % fotos.length]!;
            const direita = i % 2 === 1;
            return (
              <motion.li
                key={item.titulo}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative pl-10 sm:w-1/2 sm:pl-0 ${
                  direita ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-2 left-1.5 h-3 w-3 rounded-full ring-4 ring-background sm:left-auto ${
                    direita ? "sm:-left-1.5" : "sm:-right-1.5"
                  }`}
                  style={{ background: "var(--gradient-love)" }}
                />
                <p className="font-sans text-[0.6rem] tracking-[0.3em] text-gold/80 uppercase">
                  {item.data}
                </p>
                <h3 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                  {item.titulo}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.texto}
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-gold/20">
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-44 w-full object-cover object-top transition-transform duration-1000 hover:scale-105 sm:h-52"
                  />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
