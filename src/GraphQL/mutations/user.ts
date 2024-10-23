import { gql } from '@apollo/client';

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
