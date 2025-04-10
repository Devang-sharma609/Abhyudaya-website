"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mobileSrc?: string;
  desktopSrc?: string;
  placeholderSrc?: string;
}

export function ResponsiveImage({
  src,
  mobileSrc,
  desktopSrc,
  placeholderSrc,
  alt,
  className,
  ...props
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport size and set appropriate image source
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile && mobileSrc) {
        setCurrentSrc(mobileSrc);
      } else if (!mobile && desktopSrc) {
        setCurrentSrc(desktopSrc);
      } else {
        setCurrentSrc(src || "");
      }
    };

    // Check on mount and when window resizes
    checkViewport();
    window.addEventListener("resize", checkViewport);
    
    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, [src, mobileSrc, desktopSrc]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && placeholderSrc && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt || ""}
        className={cn(
          "w-full h-full transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
