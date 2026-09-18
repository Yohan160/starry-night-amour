import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Segredo } from "./Segredo";
import { fotos } from "@/lib/fotos";
import { FotoEnquadrada } from "./FotoEnquadrada";

const ANIVERSARIO = new Date("2026-09-18T00:00:00-03:00");

function useContagem() {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const calc = () => {
      const diff = ANIVERSARIO.getTime() - Date.now();
      if (diff <= 0) return setT(null);
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = window.setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contagem = useContagem();
  const retrato = fotos[0]!;

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-24 pb-16">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0" />

      <motion.div style={{ y, opacity }} className="relative z-20 w-full max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-sans text-[0.6rem] tracking-[0.45em] text-gold/80 uppercase sm:text-xs"
        >
          18 de setembro de 2026 <Segredo mensagem="Sim, eu decorei a data. Faz tempo.">✦</Segredo>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-[15vw] leading-[0.95] text-love sm:text-7xl md:text-8xl"
        >
          Feliz 17 anos,
          <br />
          <span className="italic">meu amor</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 1 }}
          className="mx-auto mt-8 w-full max-w-[14rem] sm:max-w-[17rem]"
        >
          <div className="relative mx-auto w-full">
            <div
              aria-hidden
              className="absolute inset-0 animate-float-soft rounded-[2rem] blur-2xl"
              style={{ background: "var(--gradient-love)", opacity: 0.55 }}
            />
            <FotoEnquadrada
              src={retrato.src}
              alt={retrato.alt}
              eager
              className="relative w-full rounded-[2rem] ring-1 ring-gold/40"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.3 }}
          className="mx-auto mt-8 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Amor, eu construí um pedacinho de universo só pra te dizer uma coisa que não cabe
          em mensagem: você é amada.{" "}
          <Segredo mensagem="Role devagar. Tem coisa escondida em quase todo canto. 👀" lado="baixo">
            ✧
          </Segredo>
        </motion.p>

        {contagem && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {[
              ["dias", contagem.d],
              ["horas", contagem.h],
              ["min", contagem.m],
              ["seg", contagem.s],
            ].map(([label, valor]) => (
              <div
                key={label as string}
                className="glass-card min-w-16 rounded-2xl px-3 py-2 sm:min-w-20"
              >
                <p className="font-display text-2xl text-foreground tabular-nums">
                  {String(valor).padStart(2, "0")}
                </p>
                <p className="font-sans text-[0.55rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {label as string}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-12 font-sans text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase"
        >
          role para descer ↓
        </motion.p>
      </motion.div>
    </section>
  );
}
