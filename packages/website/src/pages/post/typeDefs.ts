import { gql } from '@apollo/client'

export const POST = gql`
  query Post($id: ID!) {
    getPostById(id: $id) {
      _id
      html
    }
  }
`

export interface PostDetailItem {
  _id: string
  html: string
}

export interface PostDetailResult {
  getPostById: PostDetailItem
}
