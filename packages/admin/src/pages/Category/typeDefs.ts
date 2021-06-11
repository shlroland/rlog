import { gql } from '@apollo/client';

export const CATEGORY_FRAGMENT = gql`
  fragment CATEGORYFragment on CategoryModel {
    _id
    name
    label
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      _id
    }
  }
`;

export interface CreateCategoryInput {
  name: string;
  label: string;
}

export interface CreateCategoryVar {
  input: CreateCategoryInput;
}
