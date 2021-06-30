import { gql } from '@apollo/client'

export const POST = gql`
  query Post($id: ID!) {
    getPostById(id: $id) {
      _id
      html
      title
      createdAt
      tocs {
        id
        level
        text
      }
    }
  }
`

export interface PostDetailItem {
  _id: string
  html: string
  title: string
  createdAt: string
  tocs: {
    id: string
    level: string
    text: string
  }[]
}

export interface PostDetailResult {
  getPostById: PostDetailItem
}
