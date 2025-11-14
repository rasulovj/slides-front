"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import uz from "@/i18n/locales/uz.json";
import en from "@/i18n/locales/en.json";
import ru from "@/i18n/locales/ru.json";

export type Lang = "uz" | "en" | "ru";

const translations = { uz, en, ru };

interface TranslationContextProps {
  t: (key: string) => string;
  locale: Lang;
  setLocale: (lang: Lang) => void;
}

const TranslationContext = createContext<TranslationContextProps>({
  t: (key) => key,
  locale: "uz",
  setLocale: () => {},
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Lang>("uz");

  const t = (key: string) => {
    const translation = translations[locale] as Record<string, any>;
    const keys = key.split(".");
    let value: any = translation;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
