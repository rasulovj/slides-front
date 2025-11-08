// hooks/useThumbnailGenerator.ts
"use client";

import { useCallback } from "react";
import html2canvas from "html2canvas";

export function useThumbnailGenerator() {
  const generateThumbnail = useCallback(
    async (element: HTMLElement): Promise<string> => {
      try {
        // Generate canvas from element
        const canvas = await html2canvas(element, {
          width: 1920,
          height: 1080,
          scale: 1,
          useCORS: true,
          allowTaint: true,
          // backgroundColor: null,
          logging: false,
          windowWidth: 1920,
          windowHeight: 1080,
          backgroundColor: "#ffffff", // solid fallback
          ignoreElements: (el) => el.classList.contains("no-screenshot"), // optional
        });

        // Convert to base64
        const base64Image = canvas.toDataURL("image/jpeg", 0.6);
        return base64Image;
      } catch (error) {
        console.error("Failed to generate thumbnail:", error);
        throw error;
      }
    },
    []
  );

  const generateFromHTML = useCallback(
    async (html: string): Promise<string> => {
      try {
        // Create temporary container
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.style.width = "1920px";
        container.style.height = "1080px";
        container.innerHTML = html;

        document.body.appendChild(container);

        // Generate thumbnail
        const canvas = await html2canvas(container, {
          width: 1920,
          height: 1080,
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
        });

        // Cleanup
        document.body.removeChild(container);

        // Convert to base64
        return canvas.toDataURL("image/png", 0.9);
      } catch (error) {
        console.error("Failed to generate thumbnail from HTML:", error);
        throw error;
      }
    },
    []
  );

  return { generateThumbnail, generateFromHTML };
}
