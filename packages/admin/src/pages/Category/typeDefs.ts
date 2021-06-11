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

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`;

export const LIST_CATEGORY = gql`
  query ListCategory {
    getCategories {
      _id
      name
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

export interface ListCategoryResult {
  getCategories: [{ _id: string; name: string }];
}
