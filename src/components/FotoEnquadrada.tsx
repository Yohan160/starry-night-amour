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
 * com bordas arredondadas e sem fundo desfocado.
 */
export function FotoEnquadrada({ src, alt, className = "", imgClassName = "", eager }: Props) {
  return (
    <div className={`overflow-hidden rounded-2xl ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`block h-auto w-full ${imgClassName}`}
      />
    </div>
  );
}
