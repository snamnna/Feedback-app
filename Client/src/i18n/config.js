import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en/translations.json";
import faTranslations from "./locales/fa/translations.json";
import fiTranslations from "./locales/fi/translations.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translations: enTranslations,
    },
    fa: {
      translations: faTranslations,
    },
    fi: {
      translations: fiTranslations,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "fa", "fi"];

export default i18n;
