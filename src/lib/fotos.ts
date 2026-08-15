import a1 from "@/assets/fotos/anny-1.jpg.asset.json";
import a2 from "@/assets/fotos/anny-2.jpg.asset.json";
import a3 from "@/assets/fotos/anny-3.jpg.asset.json";
import a4 from "@/assets/fotos/anny-4.jpg.asset.json";
import a5 from "@/assets/fotos/anny-5.jpg.asset.json";
import a6 from "@/assets/fotos/anny-6.jpg.asset.json";
import a7 from "@/assets/fotos/anny-7.jpg.asset.json";
import a8 from "@/assets/fotos/anny-8.jpg.asset.json";
import a9 from "@/assets/fotos/anny-9.jpg.asset.json";
import a10 from "@/assets/fotos/anny-10.jpg.asset.json";

export type Foto = {
  /** URL da imagem (CDN) */
  src: string;
  /** Texto alternativo — sempre descreva a foto */
  alt: string;
  /** Legenda poética exibida junto da foto */
  caption: string;
  /** Onde o rosto está na foto: usado para nunca cortar o rosto */
  focus: "top" | "center" | "bottom";
};

/**
 * COMO TROCAR / ADICIONAR FOTOS
 * 1. Envie a imagem e gere o ponteiro em src/assets/fotos/<nome>.jpg.asset.json
 * 2. Importe aqui e adicione um objeto novo na lista abaixo.
 * A galeria, a linha do tempo e o final se adaptam automaticamente.
 */
export const fotos: Foto[] = [
  {
    src: a3.url,
    alt: "Anny Beatriz de cabelo solto, olhando para a câmera",
    caption: "O olhar que eu reconheceria em qualquer lugar do mundo.",
    focus: "top",
  },
  {
    src: a1.url,
    alt: "Close nos olhos azul-esverdeados da Anny",
    caption: "Azul, verde, e um pedacinho de céu no meio. Meus favoritos.",
    focus: "center",
  },
  {
    src: a8.url,
    alt: "Anny no carro com os cabelos ondulados iluminados pelo sol",
    caption: "O sol sempre encontra um jeito de te achar primeiro, amor.",
    focus: "top",
  },
  {
    src: a2.url,
    alt: "Anny fazendo biquinho com blusa rosa",
    caption: "Aquele biquinho que desmonta qualquer discussão.",
    focus: "top",
  },
  {
    src: a9.url,
    alt: "Anny tirando selfie no espelho com moletom preto",
    caption: "Sem produção nenhuma e ainda assim linda desse jeito.",
    focus: "top",
  },
  {
    src: a5.url,
    alt: "Anny segurando os óculos acima da cabeça",
    caption: "A cara de quem tá aprontando alguma. Eu amo essa cara.",
    focus: "top",
  },
  {
    src: a4.url,
    alt: "Anny de óculos mostrando a língua",
    caption: "A bobeira que virou uma das minhas memórias favoritas.",
    focus: "center",
  },
  {
    src: a6.url,
    alt: "Anny mandando um beijo com o cabelo ao vento",
    caption: "Esse beijo chegou. Chega até hoje.",
    focus: "center",
  },
  {
    src: a7.url,
    alt: "Anny brincando com um filtro de ursinho",
    caption: "Você transforma qualquer dia comum em algo engraçado.",
    focus: "center",
  },
  {
    src: a10.url,
    alt: "Nós dois na praça de alimentação, ela escondendo o sorriso",
    caption: "Um lanche qualquer, e mesmo assim foi um dos melhores dias.",
    focus: "center",
  },
];

export const fotoFinal = fotos[0];
