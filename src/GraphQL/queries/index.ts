import { gql } from '@apollo/client';

export const LOAD_BOOK = gql`
  query Book($id: ID!) {
    book(id: $id) {
      title
      id
      language
      pages
      isbn
      firstEdition
      authors {
        name
      }
      publisher {
        name
      }
      bookGenres {
        name
      }
    }
  }
`;

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

export const LOAD_AUTHORS = gql`
  query Authors {
    authors {
      id
      name
    }
  }
`;
