// lib/themes/templates/darkModern/index.ts
import { Theme } from "../../types";
import { darkModernConfig } from "./config";
import { DarkModernLayouts } from "./layout";

export const DarkModernTheme: Theme = {
  config: darkModernConfig,
  layouts: DarkModernLayouts,
};
