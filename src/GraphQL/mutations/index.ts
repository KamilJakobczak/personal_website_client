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
