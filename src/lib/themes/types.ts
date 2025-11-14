// lib/themes/types.ts

export interface ThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  surface?: string;
  text?: string;
  textLight?: string;
  textDark?: string;
  border?: string;
  success?: string;
  warning?: string;
  error?: string;
  gradient?: {
    start: string;
    end: string;
    direction?: string;
  };
}

export interface ThemeFonts {
  heading: {
    family: string;
    weight: {
      light: number;
      regular: number;
      semibold: number;
      bold: number;
    };
  };
  body: {
    family: string;
    weight: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
    };
  };
  mono?: {
    family: string;
    weight: {
      regular: number;
      medium: number;
    };
  };
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

export interface ThemeAnimations {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  category: "professional" | "creative" | "minimal" | "bold" | "dark";
  isPremium: boolean;
  thumbnail: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  animations: ThemeAnimations;
  customStyles?: {
    titleSlide?: React.CSSProperties;
    contentSlide?: React.CSSProperties;
    accentShape?: React.CSSProperties;
  };
}

export interface SlideSection {
  title?: string;
  points?: string[];
  description?: string;
}

export type ComparisonItem = {
  aspect?: string;
} & {
  [key: string]: string | number | undefined;
};

export type SlideContentItem = string | SlideSection | ComparisonItem;

export interface SlideData {
  id: string;
  type: keyof ThemeLayouts;
  title: string;
  subtitle?: string;
  content: SlideContentItem[];

  layout?: string;

  stats?: Array<{
    label: string;
    value: string;
    description?: string;
    icon?: string;
  }>;

  quote?: {
    text: string;
    author: string;
  };

  notes?: string;
}

export interface SlideLayoutProps {
  slide: SlideData;
  theme: ThemeConfig;
  isEditing?: boolean;
}

export interface ThemeLayouts {
  title: React.ComponentType<SlideLayoutProps>;
  content: React.ComponentType<SlideLayoutProps>;
  plan: React.ComponentType<SlideLayoutProps>;
  stats: React.ComponentType<SlideLayoutProps>;
  comparison: React.ComponentType<SlideLayoutProps>;
  cards: React.ComponentType<SlideLayoutProps>;
  quote: React.ComponentType<SlideLayoutProps>;
  twoColumn: React.ComponentType<SlideLayoutProps>;
  closing: React.ComponentType<SlideLayoutProps>;
}

export interface Theme {
  config: ThemeConfig;
  layouts: ThemeLayouts;
}
