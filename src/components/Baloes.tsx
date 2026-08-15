import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAmbiente } from "@/lib/useAmbiente";

const MENSAGENS = [
  "Você é maravilhosa. ❤️",
  "Eu amo o seu sorriso.",
  "Nunca esqueça o quanto você é especial.",
  "Você deixa meus dias melhores.",
  "Eu te amo, amor.",
  "Anny, você é única.",
  "Obrigado por existir.",
  "Você é meu lugar favorito.",
];

const CORES = [
  ["var(--rose-love)", "var(--wine)"],
  ["var(--magic)", "var(--wine)"],
  ["var(--eye-sky)", "var(--magic)"],
  ["var(--eye-mint)", "var(--eye-sky)"],
  ["var(--blush)", "var(--rose-love)"],
  ["var(--gold)", "var(--rose-love)"],
];

type Balao = {
  id: number;
  x: number;
  duracao: number;
  atraso: number;
  escala: number;
  profundidade: number;
  cor: string[];
  mensagem: string;
  drift: number;
};

let contador = 0;
function criar(leve: boolean): Balao {
  contador += 1;
  return {
    id: contador,
    x: 4 + Math.random() * 92,
    duracao: (leve ? 20 : 24) + Math.random() * 14,
    atraso: Math.random() * 6,
    escala: 0.55 + Math.random() * 0.6,
    profundidade: Math.random(),
    cor: CORES[Math.floor(Math.random() * CORES.length)]!,
    mensagem: MENSAGENS[Math.floor(Math.random() * MENSAGENS.length)]!,
    drift: (Math.random() - 0.5) * 120,
  };
}

type Estouro = { id: number; x: number; y: number; mensagem: string };

/** Balões sutis que sobem ao fundo, reagem ao ponteiro e estouram revelando mensagens. */
export function Baloes() {
  const { reduzido, leve } = useAmbiente();
  const quantidade = reduzido ? 0 : leve ? 5 : 9;
  const [baloes, setBaloes] = useState<Balao[]>([]);
  const [estouros, setEstouros] = useState<Estouro[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setBaloes(Array.from({ length: quantidade }, () => criar(leve)));
  }, [quantidade, leve]);

  useEffect(() => {
    if (reduzido) return;
    const move = (e: PointerEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduzido]);

  const particulas = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  const estourar = (balao: Balao, e: React.PointerEvent) => {
    const id = Date.now();
    setEstouros((prev) => [
      ...prev,
      { id, x: e.clientX, y: e.clientY, mensagem: balao.mensagem },
    ]);
    setBaloes((prev) => prev.filter((b) => b.id !== balao.id));
    window.setTimeout(() => setBaloes((prev) => [...prev, criar(leve)]), 1200);
    window.setTimeout(
      () => setEstouros((prev) => prev.filter((p) => p.id !== id)),
      3200,
    );
  };

  if (reduzido) return null;

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      >
        {baloes.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-label="Balão com uma mensagem"
            onPointerDown={(e) => estourar(b, e)}
            className="pointer-events-auto absolute bottom-[-22vh] cursor-pointer border-0 bg-transparent p-0"
            style={{
              left: `${b.x}%`,
              // @ts-expect-error custom property
              "--drift": `${b.drift}px`,
              animation: `rise ${b.duracao}s linear ${b.atraso}s infinite`,
              transform: `translate3d(${parallax.x * (10 + b.profundidade * 26)}px, ${
                parallax.y * (6 + b.profundidade * 14)
              }px, 0)`,
              opacity: 0.28 + b.profundidade * 0.4,
              filter: `blur(${(1 - b.profundidade) * 2.6}px)`,
              transition: "transform 700ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <span
              className="block"
              style={{ transform: `scale(${b.escala})`, transformOrigin: "bottom center" }}
            >
              <svg width="60" height="86" viewBox="0 0 60 86" fill="none">
                <defs>
                  <radialGradient id={`g${b.id}`} cx="35%" cy="28%" r="75%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.65" />
                    <stop offset="45%" stopColor={b.cor[0]} />
                    <stop offset="100%" stopColor={b.cor[1]} />
                  </radialGradient>
                </defs>
                <ellipse cx="30" cy="32" rx="24" ry="30" fill={`url(#g${b.id})`} />
                <path d="M30 62 l-5 7 h10 z" fill={b.cor[1]} />
                <path
                  d="M30 69 c6 8 -6 10 0 17"
                  stroke="var(--gold)"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M30 26 c-3 -4 -8 -1 -8 3 c0 4 8 9 8 9 s8 -5 8 -9 c0 -4 -5 -7 -8 -3z"
                  fill="white"
                  fillOpacity="0.35"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {estouros.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -12 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              {particulas.map((i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / particulas.length) * Math.PI * 2) * 70,
                    y: Math.sin((i / particulas.length) * Math.PI * 2) * 70,
                    opacity: 0,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{
                    background: i % 2 ? "var(--gold)" : "var(--rose-love)",
                    boxShadow: "0 0 10px currentColor",
                  }}
                />
              ))}
              <span className="glass-card block w-[min(70vw,15rem)] -translate-x-1/2 rounded-full px-4 py-2 text-center font-display text-base text-foreground">
                {p.mensagem}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
