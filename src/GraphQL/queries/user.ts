import { gql } from '@apollo/client';

export const CHECK_LOGIN = gql`
  query CheckLogin {
    checkLogin {
      authenticated
      userErrors{
        message
      }
      user {
        id
        profileId
        role
      }
    }
}
`;
export const LOAD_PROFILE = gql`
  query Profile($id: ID!) {
    profile(id: $id) {
      id
      bio
      isMyProfile
      booksRead {
        id
      }
  }
}
`;

export const LOAD_USER_BOOK_DETAILS = gql`
  query UserBookDetails($bookId: ID!) {
    userBookDetails(bookId: $bookId){
      userErrors {
        message
        }
      userBookDetails {
      status
      whenRead
      rating
      purchasedBookInfo {
        coverType
        edition {
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
