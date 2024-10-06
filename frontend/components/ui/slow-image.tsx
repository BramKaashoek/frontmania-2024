'use client';

import NextImage from 'next/image';
import { useEffect, useState } from 'react';

interface SlowImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const SlowImage: React.FC<SlowImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setTimeout(() => {
        setLoadedSrc(src);
      }, 7000);
    };
  }, [src]);

  if (loadedSrc === null) {
    return (
      <div style={{ width, height }} className={`bg-gray-200 ${className}`} />
    );
  }

  return (
    <NextImage
      src={loadedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};
