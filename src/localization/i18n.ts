// i18n setup using react-i18next and MMKV

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en, hi  } from './Lang/Languages'

import { getLanguage, setLanguage } from '../localStorage/mmkv';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const savedLang = getLanguage();
    callback(savedLang);
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    setLanguage(lng);
  },
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
