import { gql } from '@apollo/client';

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor(
    $id: ID!
    $firstName: String!
    $secondName: String
    $thirdName: String
    $lastName: String!
    $nationality: String
    $birthYear: Int
    $deathYear: Int
    $bioPages: bioPagesInput
  ) {
    updateAuthor(
      input: {
        id: $id
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
        id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_PUBLISHER = gql`
  mutation updatePublisher(
    $id: ID!
    $name: String!
    $website: String
    $address: addressInput
  ) {
    updatePublisher(
      input: {
        id: $id
        name: $name, 
        website: $website, 
        address: $address
      }
    ) {
      userErrors {
        message
      }
      publisher {
        id
        name
      }
    }

  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: ID!
    $authors: [String]
    $bookGenres: [String]
    $bookSeries: [String]
    $firstEdition: Int
    $isbn: String
    $language: Language
    $pages: Int
    $publisher: String
    $title: String
    $titleEnglish: String
    $titleOriginal: String
    $translators: [String] 
  ){
    updateBook(
      input: {
        id: $id
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

export const UPDATE_BOOKSERIES = gql`
  mutation updateBookSeries(
    $id: ID!
    $name: String!
    $booksInBookSeries: [BookInBookSeriesInput]
  ) {
    updateBookSeries(
      input: {
        id: $id
        name: $name
        booksInBookSeries: $booksInBookSeries
      }
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

export const UPDATE_GENRE = gql`
  mutation updateGenre(
    $id: ID!
    $name: String!
    $namePolish: String!
  ) {
    updateGenre(
      input: {
        id: $id
        name: $name
        namePolish: $namePolish
      }
    ) {
    userErrors {
      message
    }
    genre {
      id
      name
      namePolish
    }
  }
}
`;

export const UPDATE_TRANSLATOR = gql`
  mutation updateTranslator(
    $id: ID!
    $firstName: String!
    $lastName: String!
  ) {
    updateTranslator (
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      userErrors {
        message
      }
      translator {
        id
        firstName
        lastName
      }
    }
  }
`;
