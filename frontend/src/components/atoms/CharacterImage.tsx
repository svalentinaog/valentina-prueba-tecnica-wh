import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

export const CharacterImage = ({
  src,
  alt,
  style,
  className,
  fallbackSrc,
}: ImageProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      key={src}
      src={hasError && fallbackSrc ? fallbackSrc : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        if (!hasError) setHasError(true);
      }}
    />
  );
};
