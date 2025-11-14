// src/components/SlideThumbnail.tsx
"use client";

import { SlideData } from "@/lib/themes/types";
import { SlideRenderer } from "./slideRenderer";
import { useEffect, useRef, useState } from "react";
import { generateSlideThumbnailCanvas } from "@/lib/utills/thumbnail";

interface SlideThumbnailProps {
  slide: SlideData;
  themeId: string;
  onThumbnailReady?: (dataUrl: string) => void;
}

export const SlideThumbnail = ({
  slide,
  themeId,
  onThumbnailReady,
}: SlideThumbnailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    // Capture thumbnail after a short delay to ensure render is complete
    const timer = setTimeout(async () => {
      if (containerRef.current && onThumbnailReady) {
        try {
          setIsCapturing(true);
          const dataUrl = await generateSlideThumbnailCanvas(
            containerRef.current
          );
          onThumbnailReady(dataUrl);
          setIsCapturing(false);
        } catch (error) {
          console.error("Failed to generate thumbnail:", error);
          setIsCapturing(false);
        }
      }
    }, 500); // Wait for render

    return () => clearTimeout(timer);
  }, [slide, themeId, onThumbnailReady]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <SlideRenderer slide={slide} themeId={themeId} />
    </div>
  );
};
