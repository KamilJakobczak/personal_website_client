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
