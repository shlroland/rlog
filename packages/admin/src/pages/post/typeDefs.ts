import { gql } from '@apollo/client'

export interface PostItem {
  _id: string
  excerpt: string
  isRecommended: boolean
  isCommentable: boolean
  category: { name: string; _id: string }
  tags: { name: string; _id: string }[]
  title: string
  content: string
  html: string
  articleStatus: string
  createdAt: Date
  updatedAt: Date
  tocs: {
    id: string
    level: string
    text: string
  }[]
}

export enum ARTICLE_STATUS {
  DRAFT = 'draft',
  RELEASED = 'released',
  HIDDEN = 'hidden',
}

export const POST_FRAGMENT = gql`
  fragment PostFragment on PostItemModel {
    _id
    excerpt
    isRecommended
    isCommentable
    category {
      _id
      name
    }
    tags {
      _id
      name
    }
    title
    content
    html
    articleStatus
    createdAt
    updatedAt
  }
`

export const POST_LIST = gql`
  query PostList($input: PaginationInput!) {
    getPosts(input: $input) {
      total
      current
      pageSize
      items {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`

export const DELETE_ONE_POST = gql`
  mutation DeletePostById($id: ID!) {
    deletePostById(id: $id) {
      _id
    }
  }
`

export interface PostListProps {
  total: number
  current: number
  pageSize: number
  items: PostItem[]
}

export interface PostListResult {
  getPosts: PostListProps
}

export interface PostListVar {
  input: { current: number; pageSize: number }
}

export interface DeletePostResult {
  deletePostById: {
    _id: string
  }
}
