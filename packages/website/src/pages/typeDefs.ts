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
        excerpt
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
  excerpt: string
  category: PostTypeItem
  tags: PostTypeItem[]
}

export interface PostListProps {
  total: number
  current: number
  pageSize: number
  items: PostItem[]
}

export interface PostListResult {
  getPosts: PostListProps
}
