import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on UserModel {
    id
    username
    email
    password
    authorization
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      authorization
      xxx
    }
  }
`;
