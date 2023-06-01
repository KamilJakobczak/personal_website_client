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
// export const LOAD_PROFILE = gql``;
