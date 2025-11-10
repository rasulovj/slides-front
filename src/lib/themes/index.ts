// lib/themes/index.ts
import { Theme } from "./types";
import { ExecutiveTheme } from "./templates/executive";
import { DarkModernTheme } from "./templates/darkModern";
// Import other themes here as you create them

export const ThemeRegistry: Record<string, Theme> = {
  executive: ExecutiveTheme,
  darkModern: DarkModernTheme,
};

export const getAllThemes = (): Theme[] => {
  return Object.values(ThemeRegistry);
};

export const getTheme = (themeId: string): Theme | undefined => {
  return ThemeRegistry[themeId];
};

export const getThemesByCategory = (category: string): Theme[] => {
  return getAllThemes().filter((theme) => theme.config.category === category);
};

export const getFreeThemes = (): Theme[] => {
  return getAllThemes().filter((theme) => !theme.config.isPremium);
};

export const getPremiumThemes = (): Theme[] => {
  return getAllThemes().filter((theme) => theme.config.isPremium);
};
