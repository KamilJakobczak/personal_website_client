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

export const ADD_GENRE = gql`
  mutation addGenre($name: String!) {
    addGenre(input: { name: $name }) {
      userErrors {
        message
      }
      genre {
        name
        id
      }
    }
  }
`;

export const ADD_PUBLISHER = gql`
  mutation addPublisher(
    $name: String!
    $website: String
    $adress: addressInput
  ) {
    addPublisher(input: { name: $name, website: $website, address: $adress }) {
      userErrors {
        message
      }
      publisher {
        name
        id
      }
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation addAuthor(
    $firstName: String!
    $lastName: String!
    $nationality: String
    $birthYear: Int
    $deathYear: Int
    $bioPages: bioPagesInput
  ) {
    addAuthor(
      input: {
        firstName: $firstName
        lastName: $lastName
        nationality: $nationality
        birthYear: $birthYear
        deathYear: $deathYear
        bioPages: $bioPages
      }
    ) {
      userErrors {
        message
      }
      author {
        firstName
        lastName
        id
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $language: Language
    $authors: [String]!
    $collection: [String]
    $translators: [String]
    $bookGenres: [String]!
    $pages: Int
    $publisher: String
    $isbn: String
    $firstEdition: Int
  ) {
    addBook(
      input: {
        title: $title
        language: $language
        authors: $authors
        collection: $collection
        translators: $translators
        bookGenres: $bookGenres
        pages: $pages
        publisher: $publisher
        isbn: $isbn
        firstEdition: $firstEdition
      }
    ) {
      userErrors {
        message
      }
      book {
        id
        title
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup(
    $credentials: CredentialsInput!
    $name: String!
    $bio: String
  ) {
    signup(name: $name, bio: $bio, credentials: $credentials) {
      authenticated
      userErrors {
        message
      }
      user{
        id
      }
    }
  }
`;

export const SIGNIN = gql`
  mutation signin($credentials: CredentialsInput!) {
    signin(credentials: $credentials) {
      authenticated
      userErrors {
        message
      }
      user{
        id
        role
        profile{
          id
        }
      }
    }
  }
`;

export const SIGNOUT = gql`
  mutation signout {
    signout{
      authenticated
      userErrors {
        message
    }
  }
}
`;

export const ADD_USERBOOKDETAILS = gql`
  mutation addUserBookDetails(
    $bookId: String!
    $status: Status!
    $whenRead: Int
    $rating: Int
    $purchasedBookInfo: [purchasedBookInfoInput]!
     ) {
      addUserBookDetails(
        input: {
          bookID: $bookId
          bookDetails: {
            status: $status
            whenRead: $whenRead
            rating: $rating
            purchasedBookInfo: $purchasedBookInfo
            }
        }) {
        userErrors {
        message
        }
        userBookDetails {
          status
          purchasedBookInfo{
            coverType
            edition{
              editionNumber
              editionYear
            }
            buyPrice
            currency
          }
        }
    }

  }
`;
