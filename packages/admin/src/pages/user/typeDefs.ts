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
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
    }
  }
`;

export interface RegisterData {
  register: {
    id: string;
  };
}
