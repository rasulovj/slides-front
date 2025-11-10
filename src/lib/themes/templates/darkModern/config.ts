// lib/themes/templates/darkModern/config.ts
import { ThemeConfig } from "../../types";

export const darkModernConfig: ThemeConfig = {
  id: "darkModern",
  name: "Dark Modern",
  description: "Sleek dark theme with vibrant accents",
  category: "dark",
  isPremium: false,
  thumbnail: "/themes/dark-modern.png",
  colors: {
    primary: "#0EA5E9",
    secondary: "#8B5CF6",
    accent: "#F59E0B",
    background: "#0F172A",
    surface: "#1E293B",
    text: "#F8FAFC",
    textLight: "#94A3B8",
    textDark: "#E2E8F0",
    border: "#334155",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    gradient: {
      start: "#0EA5E9",
      end: "#8B5CF6",
      direction: "135deg",
    },
  },
  fonts: {
    heading: {
      family: "'Inter', sans-serif",
      weight: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
    body: {
      family: "'Inter', sans-serif",
      weight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
      },
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
    "3xl": "6rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 0 10px rgba(14, 165, 233, 0.1)",
    md: "0 0 20px rgba(14, 165, 233, 0.2)",
    lg: "0 0 30px rgba(14, 165, 233, 0.3)",
    xl: "0 0 40px rgba(14, 165, 233, 0.4)",
    "2xl": "0 0 60px rgba(14, 165, 233, 0.5)",
    inner: "inset 0 0 20px rgba(14, 165, 233, 0.1)",
  },
  animations: {
    duration: {
      fast: "200ms",
      normal: "400ms",
      slow: "600ms",
    },
    easing: {
      linear: "linear",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};
