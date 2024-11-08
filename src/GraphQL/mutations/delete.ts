import { gql } from '@apollo/client';

export const DELETE_RECORD = gql`
  mutation deleteRecord($id: ID! $model: String!) {
      deleteRecord(id: $id model: $model) {
        userErrors {
          message
        }
        success
    }
  }
  `;

// export const DELETE_PUBLISHER = gql`

// `;
