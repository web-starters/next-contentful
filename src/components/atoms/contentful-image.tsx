'use client';

import Image from 'next/image';

interface ContentfulLoaderProps {
  src: string;
  width?: number;
  quality?: number;
}

interface ContentfulImageProps extends ContentfulLoaderProps {
  height?: number;
  alt: string;
  priority?: boolean;
  className?: string;
}

const contentfulLoader = ({ src, width, quality }: ContentfulLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function ContentfulImage(props: ContentfulImageProps) {
  return <Image loader={contentfulLoader} {...props} />;
}
