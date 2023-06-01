import { gql } from '@apollo/client';

export const LOAD_AUTHOR = gql`
  query Author($id: ID!) {
    author(id: $id) {
      firstName
      lastName
      nationality
      birthYear
      books {
        id
        title
      }
    }
  }
`;

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
        id
        firstName
        lastName
      }
      publisher {
        id
        name
      }
      bookGenres {
        name
      }
    }
  }
`;

export const LOAD_PUBLISHER = gql`
  query Publisher($id: ID!) {
    publisher(id: $id) {
      name
      address {
        country
        zipCode
        city
        street
        buildingNr
        placeNr
      }
      website
      books {
        id
        title
      }
    }
  }
`;

export const LOAD_SEARCH = gql`
  query Search($contains: String!, $type: String!) {
    search(contains: $contains, type: $type) {
      __typename
      ... on Book {
        id
        title
      }
      ... on Author {
        id
        firstName
        lastName
      }
      ... on Publisher {
        id
        name
      }
    }
  }
`;
