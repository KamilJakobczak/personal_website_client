import { gql } from '@apollo/client';

export const LOAD_AUTHOR = gql`
  query Author($id: ID!) {
    author(id: $id) {
      id
      firstName
      secondName
      thirdName
      lastName
      nationality
      birthYear
      bioPages{
        wiki
        goodreads
        lubimyczytac
      }
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
      titleEnglish
      titleOriginal
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
      translators {
        id
        firstName
        lastName
      }
      bookGenres {
        id
        name
      }
      bookSeries {
        id
        name
        booksInBookSeries{
          tome
          bookId
        }
      }
    }
  }
`;

export const LOAD_GENRE = gql`
  query Genre($id: ID!) {
    genre(id: $id) {
      id
      name
      namePolish
      books {
        id
        title
      }
    }
  }
`;

export const LOAD_SINGLEBOOKSERIES = gql`
  query SingleBookSeries($id: ID!){
    singleBookSeries(id: $id){
      id
      name
      books{
        id
        title
      }
      booksInBookSeries {
        tome
        bookId
      }
  }
}`;

export const LOAD_PUBLISHER = gql`
  query Publisher($id: ID!) {
    publisher(id: $id) {
      id
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

export const LOAD_TRANSLATOR = gql`
  query Translator($id: ID!) {
    translator(id: $id) {
      id
      firstName
      lastName
      books {
        id
        title
      }
    }
  }
`;
