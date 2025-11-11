"use client";

// import PptxGenJS from "pptxgenjs";
import { SlideData, ThemeConfig } from "@/lib/themes/types";

export async function exportToPPTX(
  slides: SlideData[],
  title: string = "My Presentation",
  theme: ThemeConfig
) {
  const { default: PptxGenJS } = await import("pptxgenjs");
  const pptx = new PptxGenJS();
  pptx.title = title;

  const colors = theme?.colors || {
    background: "FFFFFF",
    text: "000000",
    primary: "2E86DE",
    secondary: "00B894",
    accent: "FFC300",
  };

  const fonts = {
    heading: theme?.fonts.heading.family || "Arial",
    body: theme?.fonts.body.family || "Calibri",
  };

  slides.forEach((slide) => {
    const pptSlide = pptx.addSlide();
    pptSlide.background = { color: colors.background };

    switch (slide.type) {
      case "title":
        pptSlide.addText(slide.title, {
          x: 1,
          y: 2,
          w: 8,
          h: 1,
          fontSize: 40,
          bold: true,
          align: "center",
          color: colors.primary,
          fontFace: fonts.heading,
        });
        if (slide.subtitle) {
          pptSlide.addText(slide.subtitle, {
            x: 1,
            y: 3,
            w: 8,
            h: 1,
            fontSize: 24,
            color: colors.text,
            align: "center",
            fontFace: fonts.body,
          });
        }
        break;

      case "content":
      case "twoColumn":
        pptSlide.addText(slide.title, {
          x: 0.5,
          y: 0.3,
          fontSize: 30,
          bold: true,
          color: colors.primary,
          fontFace: fonts.heading,
        });
        slide.content?.forEach((line, i) => {
          pptSlide.addText(`• ${line}`, {
            x: 0.8,
            y: 1.2 + i * 0.6,
            fontSize: 20,
            color: colors.text,
            fontFace: fonts.body,
          });
        });
        break;

      case "quote":
        pptSlide.addShape(pptx.ShapeType.rect, {
          x: 0.8,
          y: 1.5,
          w: 8.4,
          h: 3.5,
          fill: { color: colors.surface || "F8F9FA" },
          line: { color: colors.primary, width: 1 },
        });
        pptSlide.addText(`"${slide.quote?.text}"`, {
          x: 1,
          y: 2,
          w: 8,
          h: 2,
          fontSize: 30,
          italic: true,
          color: colors.text,
          align: "center",
          fontFace: fonts.heading,
        });
        pptSlide.addText(`— ${slide.quote?.author}`, {
          x: 1,
          y: 4,
          w: 8,
          h: 1,
          fontSize: 20,
          color: colors.secondary,
          align: "center",
          fontFace: fonts.body,
        });
        break;

      case "chart":
        if (slide.chartData) {
          pptSlide.addChart(pptx.ChartType.bar, slide.chartData, {
            x: 1,
            y: 1.5,
            w: 8,
            h: 4,
            barDir: "col",
            showValue: true,
            valAxisTitle: slide.title,
            chartColors: [colors.primary, colors.secondary, colors.accent],
          });
        }
        break;

      case "stats":
        slide.stats?.forEach((stat, i) => {
          pptSlide.addShape(pptx.ShapeType.rect, {
            x: 0.8,
            y: 0.8 + i * 2,
            w: 8.4,
            h: 1.4,
            fill: { color: colors.surface || "F5F5F5" },
            line: { color: colors.primary, width: 1 },
          });
          pptSlide.addText(stat.value, {
            x: 1,
            y: 1 + i * 2,
            fontSize: 38,
            bold: true,
            color: colors.primary,
            fontFace: fonts.heading,
          });
          pptSlide.addText(stat.label, {
            x: 4,
            y: 1 + i * 2.1,
            fontSize: 20,
            color: colors.text,
            fontFace: fonts.body,
          });
        });
        break;

      case "closing":
        pptSlide.addText(slide.title || "Thank You", {
          x: 1,
          y: 3,
          w: 8,
          h: 1,
          fontSize: 36,
          bold: true,
          color: colors.primary,
          align: "center",
          fontFace: fonts.heading,
        });
        break;

      default:
        pptSlide.addText(slide.title || "Untitled", {
          x: 1,
          y: 3,
          w: 8,
          h: 1,
          fontSize: 28,
          color: colors.text,
          align: "center",
          fontFace: fonts.body,
        });
    }
  });
  // Download the presentation
  await pptx.writeFile({ fileName: `${title}.pptx` });
}
