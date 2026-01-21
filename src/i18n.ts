import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import arTranslation from './locales/ar/translation.json';
import frTranslation from './locales/fr/translation.json';
import enTranslation from './locales/en/translation.json';

const resources = {
  ar: {
    translation: arTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    lng: localStorage.getItem('i18nextLng') || 'ar',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

// Utility function to get current direction
export const getDirection = (language: string): 'rtl' | 'ltr' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

// Utility function to format numbers based on locale
export const formatNumber = (value: number, language: string): string => {
  const localeMap: Record<string, string> = {
    ar: 'ar-DZ',
    fr: 'fr-FR',
    en: 'en-US',
  };
  return value.toLocaleString(localeMap[language] || 'ar-DZ');
};

// Utility function to format currency
export const formatCurrency = (value: number, language: string): string => {
  const formatted = formatNumber(value, language);
  const currencyLabel = language === 'ar' ? 'دج' : language === 'fr' ? 'DA' : 'DZD';
  return `${formatted} ${currencyLabel}`;
};

// Utility function to format large numbers
export const formatLargeNumber = (value: number, language: string): string => {
  const billion = 1000000000;
  const million = 1000000;

  if (value >= billion) {
    const formatted = (value / billion).toFixed(1);
    const label = language === 'ar' ? 'مليار' : language === 'fr' ? 'milliard' : 'billion';
    return `${formatted} ${label}`;
  }
  
  if (value >= million) {
    const formatted = (value / million).toFixed(0);
    const label = language === 'ar' ? 'مليون' : 'million';
    return `${formatted} ${label}`;
  }

  return formatNumber(value, language);
};
