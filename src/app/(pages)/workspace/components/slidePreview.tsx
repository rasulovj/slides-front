"use client";

import React from "react";
import { SlideLayoutProps } from "@/lib/themes/types";
import { ExecutiveLayouts } from "@/lib/themes/templates/executive/layout";

export function SlidePreview({
  slide,
  theme,
  themeId,
  scale = 0.18,
}: {
  slide: SlideLayoutProps["slide"];
  theme: SlideLayoutProps["theme"];
  themeId: string;
  scale?: number;
}) {
  const layouts = themeId === "executive" ? ExecutiveLayouts : {};

  const Layout: React.ComponentType<SlideLayoutProps> =
    (layouts[slide.type as keyof typeof layouts] as
      | React.ComponentType<SlideLayoutProps>
      | undefined) ?? (() => <div>No layout found: {slide.type}</div>);

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-sm bg-white border"
      style={{
        width: 1920 * scale,
        height: 1080 * scale,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: 1920,
          height: 1080,
          overflow: "hidden",
        }}
      >
        <Layout slide={slide} theme={theme} />
      </div>
    </div>
  );
}
