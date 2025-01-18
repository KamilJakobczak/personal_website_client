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
export const LOAD_AUTHORS_FEED = gql`
  query authorsFeed($input: FeedInput!) {
    authorsFeed(input: $input) {
       authors {
        id
        firstName
        lastName
       }
       totalCount
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

export const LOAD_BOOKS_FEED = gql`
  query BooksFeed($input: BooksFeedInput!) {
    booksFeed(input: $input) {
       books {
        id
        title
       }
       totalCount
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
export const LOAD_BOOKSERIES_FEED = gql`
  query BookSeriesFeed($input: FeedInput!) {
    bookSeriesFeed(input: $input) {
       bookSeries {
        id
        name
       }
       totalCount
    }
  }
`;

export const LOAD_GENRES = gql`
  query Genres {
    genres {
      id
      name
      namePolish
    }
  }
`;
export const LOAD_GENRES_FEED = gql`
  query GenresFeed($input: FeedInput!) {
    genresFeed(input: $input) {
       genres {
        id
        name
        namePolish
       }
       totalCount
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
export const LOAD_PUBLISHERS_FEED = gql`
  query PublishersFeed($input: FeedInput!) {
    publishersFeed(input: $input) {
       publishers {
        id
        name
       }
       totalCount
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
export const LOAD_TRANSLATORS_FEED = gql`
  query TranslatorsFeed($input: FeedInput!) {
    translatorsFeed(input: $input) {
       translators {
        id
        lastName
        firstName
       }
       totalCount
    }
  }
`;
