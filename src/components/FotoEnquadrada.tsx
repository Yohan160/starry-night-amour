type Props = {
  src: string;
  alt: string;
  /** classes de altura/tamanho do contêiner */
  className?: string;
  imgClassName?: string;
  eager?: boolean;
};

/**
 * Mostra a foto INTEIRA (sem cortar o rosto), centralizada,
 * com um fundo desfocado da própria imagem preenchendo o quadro.
 */
export function FotoEnquadrada({ src, alt, className = "", imgClassName = "", eager }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl opacity-45"
      />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`relative h-full w-full object-contain object-center ${imgClassName}`}
      />
    </div>
  );
}
