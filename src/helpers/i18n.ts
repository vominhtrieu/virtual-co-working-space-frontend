import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { TranslationVi } from "./../locales/vi/page";
import { TranslationEn } from "./../locales/en/page";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: TranslationEn,
    },
    vi: {
      translation: TranslationVi,
    },
  },
  lng: "vi",
  fallbackLng: "vi",
  keySeparator: ".",
  interpolation: { escapeValue: false },
});
