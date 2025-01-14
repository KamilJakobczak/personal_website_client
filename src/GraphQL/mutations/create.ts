import { gql } from '@apollo/client';

export const ADD_AUTHOR = gql`
  mutation addAuthor(
    $firstName: String!
    $secondName: String
    $thirdName: String
    $lastName: String!
    $nationality: String
    $birthYear: Int
    $deathYear: Int
    $bioPages: bioPagesInput
  ) {
    addAuthor(
      input: {
        firstName: $firstName
        secondName: $secondName
        thirdName: $thirdName
        lastName: $lastName
        nationality: $nationality
        birthYear: $birthYear
        deathYear: $deathYear
        bioPages: $bioPages
      }
    ) {
      userErrors {
        message
      }
      author {
        firstName
        lastName
        id
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $authors: [String]!
    $bookGenres: [String]!
    $bookSeries: [String]!
    $firstEdition: Int
    $isbn: String
    $language: Language
    $pages: Int
    $publisher: String
    $title: String!
    $titleEnglish: String
    $titleOriginal: String!
    $translators: [String] 
  ) {
    addBook(
      input: {
        bookSeries: $bookSeries
        title: $title
        titleEnglish: $titleEnglish
        titleOriginal: $titleOriginal
        language: $language
        authors: $authors
        translators: $translators
        bookGenres: $bookGenres
        pages: $pages
        publisher: $publisher
        isbn: $isbn
        firstEdition: $firstEdition
      }
    ) {
      userErrors {
        message
      }
      book {
        id
        title
      }
    }
  }
`;

export const ADD_BOOKSERIES = gql`
  mutation addBookSeries(
    $name: String!
    $booksInBookSeries: [BookInBookSeriesInput]
  ) {
    addBookSeries(
      input: { name: $name, booksInBookSeries: $booksInBookSeries }
    ) {
      userErrors {
        message
      }
      bookSeries {
        name
        id
      }
    }
  }
`;

export const ADD_GENRE = gql`
  mutation addGenre(
    $name: String! 
    $namePolish: String!
    ) {
    addGenre(
      input: { name: $name namePolish: $namePolish }) {
      userErrors {
        message
      }
      genre {
        name
        namePolish
        id
      }
    }
  }
`;

export const ADD_PUBLISHER = gql`
  mutation addPublisher(
    $name: String!
    $website: String
    $address: addressInput
  ) {
    addPublisher(input: { name: $name website: $website address: $address }) {
      userErrors {
        message
      }
      publisher {
        name
        id
      }
    }
  }
`;

export const ADD_TRANSLATOR = gql`
  mutation addTranslator($firstName: String!, $lastName: String!) {
    addTranslator(input: { firstName: $firstName lastName: $lastName }) {
      userErrors {
        message
      }
      translator {
        firstName
        lastName
        id
      }
    }
  }
`;
