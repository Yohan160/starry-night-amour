import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Segredo } from "./Segredo";

export function Dezessete() {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative overflow-hidden px-5 py-28 sm:py-40">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(24px)" }}
          animate={visivel ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-float-soft rounded-full blur-3xl"
            style={{ background: "var(--gradient-love)", opacity: 0.5 }}
          />
          <span className="font-display text-[42vw] leading-none text-love sm:text-[16rem]">
            17
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={visivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-4 font-display text-2xl text-foreground sm:text-4xl"
        >
          17 anos desde que Anny Beatriz chegou ao mundo.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visivel ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          className="mx-auto mt-5 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Dezessete anos de uma pessoa extraordinária. E eu tive a sorte absurda de aparecer
          em alguns deles.{" "}
          <Segredo mensagem="Eu quero estar nos próximos também, se você deixar. 🤍" lado="baixo">
            ✧
          </Segredo>
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-2xl">
          <Segredo mensagem="Um presente pequeno: eu escrevi cada palavra desse site pensando em você.">
            🎁
          </Segredo>
          <Segredo mensagem="Faz o pedido direito lá embaixo, hein. Sem trapaça.">🎈</Segredo>
          <Segredo mensagem="Se você chegou até aqui clicando em tudo, você é exatamente quem eu imaginei.">
            ⭐
          </Segredo>
          <Segredo mensagem="Confete mental: parabéns, amor! 🎉">🎂</Segredo>
        </div>
      </div>
    </section>
  );
}
