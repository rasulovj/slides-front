import { Document } from "@react-pdf/renderer";
import React from "react";
import { SlideLayoutProps } from "./types";
import { ExecutivePDFLayouts } from "./templates/executive/pdfLayout";

export const SlidePDF = ({
  slides,
  theme,
  themeId,
}: {
  slides: SlideLayoutProps["slide"][];
  theme: SlideLayoutProps["theme"];
  themeId: string;
}) => {
  const layouts =
    themeId === "executive"
      ? ExecutivePDFLayouts
      : (() => {
          console.warn(`No layouts found for theme: ${themeId}`);
          return {};
        })();

  return (
    <Document>
      {slides.map((slide, index) => {
        const Layout = layouts[slide.type as keyof typeof layouts] as
          | React.ComponentType<SlideLayoutProps>
          | undefined;
        if (!Layout) {
          console.warn(`No layout found for slide ${index}: ${slide.type}`);
          return null;
        }
        return <Layout key={index} slide={slide} theme={theme} />;
      })}
    </Document>
  );
};
