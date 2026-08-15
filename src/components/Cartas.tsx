import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cartas } from "@/lib/textos";
import { Segredo } from "./Segredo";

const SEGREDOS_CARTA = [
  "Eu reli isso umas cinco vezes só pra ter certeza que tava do jeito que eu sinto.",
  "Se você tá com o olho marejado agora, missão cumprida. Desculpa. (Não desculpa.)",
  "Você é o motivo de eu ter aprendido a fazer site, sabia?",
];

export function Cartas() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 py-24 sm:py-32">
      {cartas.map((carta, i) => (
        <Carta key={carta.id} carta={carta} indice={i} />
      ))}
    </section>
  );
}

function Carta({ carta, indice }: { carta: (typeof cartas)[number]; indice: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="relative mb-24 last:mb-0 sm:mb-36">
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        animate={visivel ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="font-sans text-[0.6rem] tracking-[0.4em] text-gold/80 uppercase"
      >
        {carta.kicker}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        animate={visivel ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-display text-4xl leading-tight text-love sm:text-6xl"
      >
        {carta.titulo}
      </motion.h2>

      <div aria-hidden className="gold-rule my-7" />

      <div className="space-y-5">
        {carta.paragrafos.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={visivel ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 + i * 0.18 }}
            className="max-w-2xl font-sans text-base leading-[1.85] text-muted-foreground sm:text-lg"
          >
            {p}
          </motion.p>
        ))}
      </div>

      <div className="mt-6">
        <Segredo mensagem={SEGREDOS_CARTA[indice] ?? "Eu te amo, amor."} lado="baixo">
          ❤
        </Segredo>
      </div>
    </div>
  );
}
