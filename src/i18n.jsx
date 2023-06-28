import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./lang/en.json";
import translationFR from "./lang/fr.json";
import translationES from "./lang/es.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  es: {
    translation: translationES,
  },
};
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: resources.hasOwnProperty(navigator.language.slice(0,2))?navigator.language.slice(0,2):'en',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
