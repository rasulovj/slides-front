// src/lib/utils/slideThumbnail.ts
import { SlideData } from "@/lib/themes/types";
import { getTheme } from "@/lib/themes";

const MASTER_W = 1920;
const MASTER_H = 1080;

export const generateSlideThumbnail = async (
  slide: SlideData,
  themeId: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const theme = getTheme(themeId);
      if (!theme) {
        throw new Error(`Theme not found: ${themeId}`);
      }

      const Layout = theme.layouts[slide.type];
      if (!Layout) {
        throw new Error(`Layout not found: ${slide.type}`);
      }

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.width = `${MASTER_W}px`;
      container.style.height = `${MASTER_H}px`;
      container.style.overflow = "hidden";
      document.body.appendChild(container);

      const slideContainer = document.createElement("div");
      slideContainer.style.width = "100%";
      slideContainer.style.height = "100%";
      slideContainer.style.position = "relative";

      container.appendChild(slideContainer);

      import("html2canvas").then((html2canvas) => {
        html2canvas
          .default(slideContainer, {
            backgroundColor: "#ffffff",
            scale: 0.25, // Scale down for smaller thumbnail
            logging: false,
          })
          .then((canvas) => {
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            document.body.removeChild(container);
            resolve(dataUrl);
          })
          .catch((err) => {
            document.body.removeChild(container);
            reject(err);
          });
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Alternative: Use canvas API to capture slide
 */
export const generateSlideThumbnailCanvas = async (
  slideElement: HTMLElement
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      import("html2canvas").then((html2canvas) => {
        html2canvas
          .default(slideElement, {
            backgroundColor: "#ffffff",
            scale: 0.25,
            logging: false,
            useCORS: true,
          })
          .then((canvas) => {
            resolve(canvas.toDataURL("image/jpeg", 0.8));
          })
          .catch(reject);
      });
    } catch (error) {
      reject(error);
    }
  });
};
