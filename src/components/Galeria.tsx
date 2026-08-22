import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fotos } from "@/lib/fotos";
import { useAmbiente } from "@/lib/useAmbiente";
import { Segredo } from "./Segredo";

const objectPos = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

/** Galeria cinematográfica: cada foto entra de um jeito diferente. */
export function Galeria() {
  const root = useRef<HTMLDivElement>(null);
  const { reduzido } = useAmbiente();

  useEffect(() => {
    if (reduzido || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-foto]").forEach((el, i) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          el,
          {
            opacity: 0,
            scale: 0.86,
            yPercent: 12,
            rotate: i % 2 ? -1.4 : 1.4,
            filter: "blur(14px)",
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            rotate: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.22 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );
        }
        gsap.fromTo(
          el,
          { y: 40 * (i % 3 === 0 ? 1.6 : 0.7) },
          {
            y: -40 * (i % 3 === 0 ? 1.6 : 0.7),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduzido]);

  return (
    <section ref={root} className="relative px-5 py-20 sm:py-28">
      <header className="mx-auto mb-16 max-w-3xl text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] text-gold/80 uppercase">
          memórias
        </p>
        <h2 className="mt-3 font-display text-4xl text-love sm:text-6xl">
          Cada foto sua é uma prova
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-muted-foreground sm:text-base">
          De que a beleza não é só o rosto, amor — é o que acontece quando você aparece.{" "}
          <Segredo mensagem="Eu tenho essas fotos salvas. Todas. Sem exceção." lado="baixo">
            ✦
          </Segredo>
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-6 sm:gap-10">
        {fotos.map((foto, i) => {
          const grande = i % 5 === 0;
          const media = i % 5 === 3;
          return (
            <figure
              key={foto.src}
              data-foto
              className={`group relative overflow-hidden rounded-[1.75rem] ${
                grande
                  ? "sm:col-span-6"
                  : media
                    ? "sm:col-span-4 sm:col-start-2"
                    : "sm:col-span-3"
              }`}
              style={{ boxShadow: "var(--shadow-bloom)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-60 mix-blend-soft-light"
                style={{ background: "var(--gradient-love)" }}
              />
              <FotoEnquadrada
                src={foto.src}
                alt={foto.alt}
                className={`w-full ${
                  grande ? "h-[58svh] sm:h-[80svh]" : "h-[52svh] sm:h-[62svh]"
                }`}
                imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background/90 to-transparent p-5 pt-16">
                <p className="font-display text-lg leading-snug text-foreground sm:text-2xl">
                  {foto.caption}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
