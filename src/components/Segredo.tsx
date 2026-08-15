import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  mensagem: string;
  children: ReactNode;
  className?: string;
  /** posição do balão de mensagem */
  lado?: "cima" | "baixo";
};

/** Pequeno elemento decorativo escondido que revela uma mensagem ao ser tocado. */
export function Segredo({ mensagem, children, className = "", lado = "cima" }: Props) {
  const [aberto, setAberto] = useState(false);

  return (
    <span className={`relative inline-flex align-middle ${className}`}>
      <button
        type="button"
        aria-label="Uma surpresa escondida"
        onClick={() => setAberto((v) => !v)}
        className="relative inline-flex min-h-8 min-w-8 items-center justify-center rounded-full text-gold/80 transition-transform duration-300 hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:scale-95"
      >
        <span className="animate-twinkle">{children}</span>
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.span
            initial={{ opacity: 0, y: lado === "cima" ? 8 : -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: lado === "cima" ? 8 : -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={() => setAberto(false)}
            className={`glass-card absolute left-1/2 z-50 w-[min(78vw,17rem)] -translate-x-1/2 rounded-2xl px-4 py-3 text-center font-sans text-[0.8rem] leading-relaxed text-foreground ${
              lado === "cima" ? "bottom-full mb-3" : "top-full mt-3"
            }`}
          >
            {mensagem}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
