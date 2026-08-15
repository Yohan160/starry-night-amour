import { useEffect, useState } from "react";

/** Detecta preferências e capacidade do dispositivo para adaptar os efeitos. */
export function useAmbiente() {
  const [reduzido, setReduzido] = useState(false);
  const [leve, setLeve] = useState(false);
  const [toque, setToque] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduzido(mq.matches);
    apply();
    mq.addEventListener("change", apply);

    const nav = navigator as Navigator & { deviceMemory?: number };
    const poucaMemoria = (nav.deviceMemory ?? 8) <= 4;
    const poucosNucleos = (navigator.hardwareConcurrency ?? 8) <= 4;
    const telaPequena = window.matchMedia("(max-width: 768px)").matches;
    setLeve(poucaMemoria || poucosNucleos || telaPequena);
    setToque(window.matchMedia("(hover: none)").matches);

    return () => mq.removeEventListener("change", apply);
  }, []);

  return { reduzido, leve, toque };
}
