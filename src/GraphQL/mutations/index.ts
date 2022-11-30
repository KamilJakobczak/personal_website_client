import { gql } from '@apollo/client';

export const ADD_COLLECTION = gql`
  mutation addCollection(
    $name: String!
    $booksInCollection: [BookInCollectionInput]
  ) {
    addCollection(
      input: { name: $name, booksInCollection: $booksInCollection }
    ) {
      userErrors {
        message
      }
      collection {
        name
        id
      }
    }
  }
`;

export const ADD_TRANSLATOR = gql`
  mutation addTranslator($firstName: String!, $lastName: String!) {
    addTranslator(input: { firstName: $firstName, lastName: $lastName }) {
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

export const ADD_GENRE = gql`
  mutation addGenre($name: String!) {
    addGenre(input: { name: $name }) {
      userErrors {
        message
      }
      genre {
        name
        id
      }
    }
  }
`;

export const ADD_PUBLISHER = gql`
  mutation addPublisher(
    $name: String!
    $website: String
    $adress: addressInput
  ) {
    addPublisher(input: { name: $name, website: $website, address: $adress }) {
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

export const ADD_AUTHOR = gql`
  mutation addAuthor(
    $firstName: String!
    $lastName: String!
    $nationality: String
    $birthYear: Int
    $deathYear: Int
    $bioPages: bioPagesInput
  ) {
    addAuthor(
      input: {
        firstName: $firstName
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
