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
        firstName
        lastName
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
        firstName
        lastName
      }
    }
  }
`;

export const LOAD_AUTHORS = gql`
  query Authors {
    authors {
      id
      firstName
      lastName
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

export const LOAD_GENRES = gql`
  query Genres {
    genres {
      id
      name
    }
  }
`;
