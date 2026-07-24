import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './locales/es.json';
import en from './locales/en.json';
import enDestinations from './locales/en.destinations.json';

const updateDocumentLanguage = (language) => {
  document.documentElement.lang = language;
  document.title = i18n.t('meta.title');
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: { ...en, ...enDestinations } },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      // Solo idioma elegido a mano (localStorage). Sin navigator:
      // Google y la 1.ª visita quedan en español (fallbackLng).
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'tanu-language',
    },
  })
  .then(() => updateDocumentLanguage(i18n.language));

i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
