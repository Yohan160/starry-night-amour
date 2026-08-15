import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useAmbiente } from "@/lib/useAmbiente";

/** Halo suave que segue o cursor — desativado em toque e em movimento reduzido. */
export function CursorAura() {
  const { reduzido, toque } = useAmbiente();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduzido || toque) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduzido, toque, x, y]);

  if (reduzido || toque) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-30 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen"
    >
      <div
        className="h-full w-full rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--rose-love) 22%, transparent), color-mix(in oklab, var(--magic) 12%, transparent) 45%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
