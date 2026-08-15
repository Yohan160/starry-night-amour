import { motion } from "motion/react";
import { fotoFinal } from "@/lib/fotos";

const LINHAS = [
  "Amor, eu não sei o que o futuro guarda.",
  "Não sei quantos aniversários a gente ainda vai comemorar juntos, quantas fotos bobas ainda vamos tirar, quantas histórias ainda vamos colecionar.",
  "Mas sei de uma coisa: eu tenho muita sorte de estar aqui hoje, vendo você completar mais um ano.",
  "Você chegou na minha vida e trouxe cor pra coisas que eram só rotina. Você me ensinou que carinho é detalhe, que cumplicidade é rir da mesma bobagem, e que saudade é uma forma esquisita de dizer “você é importante”.",
  "Eu queria que você se enxergasse por um minuto do jeito que eu te enxergo, Anny. Você é inteligente, forte, engraçada, gentil, teimosa do jeito certo, e absurdamente linda — por dentro e por fora.",
  "Você merece ser lembrada todo santo dia do quanto é incrível. E se o mundo esquecer, eu lembro. Todo dia.",
  "Então hoje eu só quero que você saiba uma coisa:",
];

export function CartaFinal() {
  return (
    <section className="relative mx-auto max-w-3xl px-5 py-28 sm:py-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mb-14 w-full max-w-sm overflow-hidden rounded-[2rem]"
        style={{ boxShadow: "var(--shadow-glow-rose)" }}
      >
        <img
          src={fotoFinal.src}
          alt={fotoFinal.alt}
          loading="lazy"
          decoding="async"
          className="h-[52svh] w-full object-cover object-top"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--background) 80%, transparent), transparent 55%)",
          }}
        />
      </motion.div>

      <div className="space-y-6 text-center">
        {LINHAS.map((linha, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, delay: 0.05 * i }}
            className="mx-auto max-w-2xl font-sans text-base leading-[1.95] text-muted-foreground sm:text-lg"
          >
            {linha}
          </motion.p>
        ))}

        <motion.p
          initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
          className="pt-6 font-display text-5xl leading-tight text-love sm:text-7xl"
        >
          Eu te amo.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="font-display text-2xl text-foreground italic sm:text-4xl"
        >
          Feliz 17 anos, meu amor. ❤️
        </motion.p>
      </div>
    </section>
  );
}
