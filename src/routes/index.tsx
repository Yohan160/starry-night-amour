import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Intro } from "@/components/Intro";
import { Baloes } from "@/components/Baloes";
import { CursorAura } from "@/components/CursorAura";
import { Hero } from "@/components/Hero";
import { Cartas } from "@/components/Cartas";
import { Galeria } from "@/components/Galeria";
import { Motivos } from "@/components/Motivos";
import { Dezessete } from "@/components/Dezessete";
import { Pedido } from "@/components/Pedido";
import { NossaHistoria } from "@/components/NossaHistoria";
import { CartaFinal } from "@/components/CartaFinal";
import { Finale } from "@/components/Finale";
import { Musica } from "@/components/Musica";
import { Segredo } from "@/components/Segredo";

const TITULO = "Feliz 17 anos, Anny Beatriz ❤️";
const DESCRICAO =
  "Uma experiência digital feita com amor para o aniversário de 17 anos da Anny Beatriz — memórias, motivos e uma surpresa no final.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Pagina,
});

function Pagina() {
  const [revelado, setRevelado] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {!revelado && <Intro aoTerminar={() => setRevelado(true)} />}

      <SmoothScroll />
      <CursorAura />
      {revelado && <Baloes />}
      <Musica />

      <div
        className={`relative z-20 transition-opacity duration-1000 ${
          revelado ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
        <Cartas />
        <Galeria />
        <Motivos />
        <Dezessete />
        <Pedido />
        <NossaHistoria />
        <CartaFinal />
        <Finale />

        <footer className="relative px-5 pb-16 text-center">
          <div aria-hidden className="gold-rule mx-auto mb-8 max-w-xs" />
          <p className="font-sans text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
            feito à mão, com amor, para Anny Beatriz{" "}
            <Segredo mensagem="Cada linha de código aqui é uma forma esquisita de dizer eu te amo." lado="cima">
              ❤
            </Segredo>
          </p>
          <p className="mt-3 font-display text-lg text-love">18.09.2026</p>
        </footer>
      </div>
    </main>
  );
}
