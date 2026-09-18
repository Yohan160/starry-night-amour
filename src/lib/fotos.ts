const fotosArquivos = [
  "/starry-night-amour/IMG-20250518-WA0072.jpg",
  "/starry-night-amour/IMG-20250917-WA0036.jpg",
  "/starry-night-amour/IMG-20251019-WA0020.jpg",
  "/starry-night-amour/IMG-20251024-WA0006.jpg",
  "/starry-night-amour/IMG-20251127-WA0013.jpg",
  "/starry-night-amour/IMG-20260302-WA0039(1).jpg",
  "/starry-night-amour/IMG-20260306-WA0054.jpg",
  "/starry-night-amour/IMG-20260513-WA0072.jpg",
  "/starry-night-amour/IMG-20260811-WA0076.jpg",
  "/starry-night-amour/IMG_20260722_172931_1.jpg",
] as const;

export type Foto = {
  /** URL da imagem hospedada diretamente no GitHub Pages */
  src: string;
  /** Texto alternativo — sempre descreva a foto */
  alt: string;
  /** Legenda poética exibida junto da foto */
  caption: string;
  /** Onde o rosto está na foto: usado para nunca cortar o rosto */
  focus: "top" | "center" | "bottom";
};

/**
 * As fotos agora ficam dentro do próprio repositório.
 *
 * Isso remove a dependência dos arquivos .asset.json do Lovable.
 * Para trocar uma foto no futuro, basta substituir o arquivo correspondente
 * no repositório mantendo o mesmo nome.
 */
export const fotos: Foto[] = [
  {
    src: fotosArquivos[2],
    alt: "Anny Beatriz de cabelo solto, olhando para a câmera",
    caption: "O olhar que eu reconheceria em qualquer lugar do mundo.",
    focus: "top",
  },
  {
    src: fotosArquivos[0],
    alt: "Close nos olhos azul-esverdeados da Anny",
    caption: "Azul, verde, e um pedacinho de céu no meio. Meus favoritos.",
    focus: "center",
  },
  {
    src: fotosArquivos[7],
    alt: "Anny no carro com os cabelos ondulados iluminados pelo sol",
    caption: "O sol sempre encontra um jeito de te achar primeiro, amor.",
    focus: "top",
  },
  {
    src: fotosArquivos[1],
    alt: "Anny fazendo biquinho com blusa rosa",
    caption: "Aquele biquinho que desmonta qualquer discussão.",
    focus: "top",
  },
  {
    src: fotosArquivos[8],
    alt: "Anny tirando selfie no espelho com moletom preto",
    caption: "Sem produção nenhuma e ainda assim linda desse jeito.",
    focus: "top",
  },
  {
    src: fotosArquivos[4],
    alt: "Anny segurando os óculos acima da cabeça",
    caption: "A cara de quem tá aprontando alguma. Eu amo essa cara.",
    focus: "top",
  },
  {
    src: fotosArquivos[3],
    alt: "Anny de óculos mostrando a língua",
    caption: "A bobeira que virou uma das minhas memórias favoritas.",
    focus: "center",
  },
  {
    src: fotosArquivos[6],
    alt: "Anny mandando um beijo com o cabelo ao vento",
    caption: "Esse beijo chegou. Chega até hoje.",
    focus: "center",
  },
  {
    src: fotosArquivos[5],
    alt: "Anny brincando com um filtro de ursinho",
    caption: "Você transforma qualquer dia comum em algo engraçado.",
    focus: "center",
  },
  {
    src: fotosArquivos[9],
    alt: "Nós dois na praça de alimentação, ela escondendo o sorriso",
    caption: "Um lanche qualquer, e mesmo assim foi um dos melhores dias.",
    focus: "center",
  },
];

export const fotoFinal = fotos[0]!;
