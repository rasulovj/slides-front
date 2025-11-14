"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "uz",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    }
  )
);
