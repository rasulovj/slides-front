import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "@/i18n/locales/uz.json";
import en from "@/i18n/locales/en.json";
import ru from "@/i18n/locales/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: "uz",
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
