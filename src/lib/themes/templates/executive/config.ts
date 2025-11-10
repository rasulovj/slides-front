// lib/themes/templates/executive/config.ts
import { ThemeConfig } from "../../types";

export const executiveConfig: ThemeConfig = {
  id: "executive",
  name: "Executive",
  description: "Professional business presentation with bold purple design",
  category: "professional",
  isPremium: false,
  thumbnail: "/themes/executive.png",
  colors: {
    primary: "#3D2E5C",
    secondary: "#FFD700",
    accent: "#FF6B6B",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#1F2937",
    textLight: "#6B7280",
    textDark: "#111827",
    border: "#E5E7EB",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
  fonts: {
    heading: {
      family: "'Montserrat', sans-serif",
      weight: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700,
      },
    },
    body: {
      family: "'Open Sans', sans-serif",
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
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
  animations: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      linear: "linear",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};
