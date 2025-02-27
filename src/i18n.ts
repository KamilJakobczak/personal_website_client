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
        author: 'author',
        authors: 'authors',
        book: 'book',
        books: 'books',
        bookSeries: 'book series',
        singleBookSeries: 'book series',
        genre: 'genre',
        genres: 'genres',
        publisher: 'publisher',
        publishers: 'publishers',
        translator: 'translator',
        translators: 'translators',
        add: 'add',
        logIn: 'log in',
        logOut: 'log out',
        profile: 'profile',
        signUp: 'sign up',
        search: 'Search',
        birthYear: 'Year of birth',
        nationality: 'Nationality',
        street: 'Street',
        city: 'City',
        zipCode: 'Zip Code',
        country: 'Country',
        website: 'website',
      },
    },
    pl: {
      translation: {
        author: 'autor',
        authors: 'autorzy',
        book: 'książka',
        books: 'książki',
        bookSeries: 'serie',
        singleBookSeries: 'seria',
        genre: 'gatunek',
        genres: 'gatunki',
        publisher: 'wydawnictwo',
        publishers: 'wydawnictwa',
        translator: 'tłumacz',
        translators: 'tłumacze',
        add: 'dodaj',
        logIn: 'zaloguj się',
        logOut: 'wyloguj się',
        profile: 'profil',
        signUp: 'zarejestruj się',
        search: 'Wyszukaj',
        birthYear: 'Rok urodzenia',
        nationality: 'Narodowość',
        street: 'Ulica',
        city: 'Miasto',
        zipCode: 'Kod pocztowy',
        country: 'Kraj',
        website: 'Strona internetowa',
      },
    },
  },
});

export default i18n;
