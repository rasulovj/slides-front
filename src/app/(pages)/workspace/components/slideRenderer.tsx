// components/presentation/SlideRenderer.tsx
"use client";

import { SlideData } from "@/lib/themes/types";
import { getTheme } from "@/lib/themes";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

interface SlideRendererProps {
  slide: SlideData;
  themeId: string;
  isEditing?: boolean;
}

const MASTER_W = 1920;
const MASTER_H = 1080;

export const SlideRenderer = forwardRef<HTMLDivElement, SlideRendererProps>(
  ({ slide, themeId, isEditing = false }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const theme = useMemo(() => getTheme(themeId), [themeId]);

    useEffect(() => {
      const ro = new ResizeObserver(([entry]) => {
        const { width: cw, height: ch } = entry.contentRect;

        const scaleX = cw / MASTER_W;
        const scaleY = ch / MASTER_H;
        const safeScale = Math.min(scaleX, scaleY);

        setScale(safeScale);
      });

      if (containerRef.current) ro.observe(containerRef.current);
      return () => ro.disconnect();
    }, []);

    if (!theme)
      return (
        <div className="w-full h-full grid place-content-center bg-gray-100 text-gray-600">
          Theme not found: {themeId}
        </div>
      );

    const Layout = theme.layouts[slide.type];
    if (!Layout)
      return (
        <div className="w-full h-full grid place-content-center bg-gray-100 text-gray-600">
          Layout not found: {slide.type}
        </div>
      );

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref.current as any) = node;
        }}
        className="relative w-full h-full grid place-content-center overflow-hidden "
      >
        <div
          className="relative"
          style={{
            width: MASTER_W,
            height: MASTER_H,
            transform: `scale(${scale})`,
          }}
        >
          <Layout slide={slide} theme={theme.config} isEditing={isEditing} />
        </div>

        {isEditing && (
          <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-blue-400/40 rounded-lg" />
        )}
      </div>
    );
  }
);

SlideRenderer.displayName = "SlideRenderer";
