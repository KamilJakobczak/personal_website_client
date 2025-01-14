import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        books: 'books',
        authors: 'authors',
        publishers: 'publishers',
      },
    },
    pl: {
      translation: {
        books: 'książki',
        authors: 'autorzy',
        publishers: 'wydawnictwa',
      },
    },
  },
});

export default i18n;
