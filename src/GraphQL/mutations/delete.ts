import { gql } from '@apollo/client';

// export const DELETE_AUTHOR = gql`

// `;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      userErrors {
        message
      }
      success
    }
  }
  `;

// export const DELETE_PUBLISHER = gql`

// `;
