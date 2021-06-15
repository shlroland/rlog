import { gql } from '@apollo/client'

export const POST_LIST = gql`
  query PostList($input: PaginationInput!) {
    getPosts(input: $input) {
      total
      current
      pageSize
      items {
        _id
        title
        category {
          _id
          name
          label
        }
        tags {
          _id
          name
          label
        }
      }
    }
  }
`

export interface PostTypeItem {
  _id: string
  label: string
  name: string
}

export interface PostItem {
  _id: string
  title: string
  category: PostTypeItem
  tags: PostTypeItem[]
}
