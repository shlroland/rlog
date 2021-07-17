import { gql } from '@apollo/client'

export const TAG_FRAGMENT = gql`
  fragment TagFragment on TagModel {
    _id
    name
    label
  }
`

export const UPSERT_TAG = gql`
  mutation UpsertTag($input: UpsertTagInput!) {
    upsertTag(input: $input) {
      _id
    }
  }
`

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      _id
    }
  }
`

export const LIST_TAG = gql`
  query ListTag {
    getTags {
      ...TagFragment
    }
  }
  ${TAG_FRAGMENT}
`

export interface TagItem {
  _id: string
  name: string
  label: string
}

export interface UpsertTagInput {
  _id?: string
  name: string
  label: string
}

export interface UpsertTagVar {
  input: UpsertTagInput
}

export interface ListTagResult {
  getTags: [{ _id: string; name: string; label: string }]
}
