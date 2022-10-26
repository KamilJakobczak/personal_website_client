import { gql } from '@apollo/client';

export const LOAD_BOOKS = gql`
  query Books {
    books {
      title
      id
      authors {
        name
      }
    }
  }
`;
