import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TranslationEnCommon } from "../locales/en/common";
import { TranslationViCommon } from "../locales/vi/common";

import { TranslationViPages } from "../locales/vi/pages";
import { TranslationEnPages } from "./../locales/en/pages";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        default: TranslationEnCommon,
        pages: TranslationEnPages,
      },
    },
    vi: {
      translation: {
        default: TranslationViCommon,
        pages: TranslationViPages,
      },
    },
  },
  lng: "vi",
  fallbackLng: "vi",
  keySeparator: ".",
  interpolation: { escapeValue: false },
});
