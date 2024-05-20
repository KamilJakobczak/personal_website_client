import { gql } from '@apollo/client';

export const LOAD_AUTHORS = gql`
  query Authors {
    authors {
      id
      firstName
      lastName
    }
  }
`;

export const LOAD_BOOKS = gql`
  query Books($input: BooksInput) {
    books(input: $input) {
      title
      id
      authors {
        firstName
        lastName
      }
    }
  }
`;

export const LOAD_BOOKSERIES = gql`
  query BookSeries { 
    bookSeries {
      id
      name
    }
  }
`;

export const LOAD_GENRES = gql`
  query Genres {
    genres {
      id
      name
    }
  }
`;

export const LOAD_PUBLISHERS = gql`
  query Publishers {
    publishers {
      id
      name
    }
  }
`;

export const LOAD_TRANSLATORS = gql`
  query Translators {
    translators {
      id
      firstName
      lastName
    }
  }
`;
