import { gql } from '@apollo/client'

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on CategoryModel {
    _id
    name
    label
  }
`

export const UPSERT_CATEGORY = gql`
  mutation UpsertCategory($input: UpsertCategoryInput!) {
    upsertCategory(input: $input) {
      _id
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`

export const LIST_CATEGORY = gql`
  query ListCategory {
    getCategories {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`

export interface CategoryItem {
  _id: string
  name: string
  label: string
}

export interface UpsertCategoryInput {
  _id?: string
  name: string
  label: string
}

export interface UpsertCategoryVar {
  input: UpsertCategoryInput
}

export interface ListCategoryResult {
  getCategories: [{ _id: string; name: string; label: string }]
}
