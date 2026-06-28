"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import Image from "next/image";

type LazyViewportImageProps = ComponentProps<typeof Image> & {
  rootMargin?: string;
  wrapperClassName?: string;
};

export default function LazyViewportImage({
  rootMargin = "280px 0px",
  wrapperClassName = "",
  width,
  height,
  className,
  alt = "",
  ...imageProps
}: LazyViewportImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  const resolvedWidth = typeof width === "number" ? width : 16;
  const resolvedHeight = typeof height === "number" ? height : 9;

  return (
    <div
      ref={rootRef}
      className={wrapperClassName}
      style={{ aspectRatio: `${resolvedWidth} / ${resolvedHeight}` }}
    >
      {isVisible ? (
        <Image
          {...imageProps}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading="lazy"
          fetchPriority="low"
          priority={false}
          decoding="async"
        />
      ) : null}
    </div>
  );
}
