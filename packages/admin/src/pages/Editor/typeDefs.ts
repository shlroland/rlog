import { gql } from '@apollo/client';

const POST_FRAGMENT = gql`
  fragment PostFragment on PostItemModel {
    _id
    excerpt
    isRecommended
    isCommentable
    category
    tags
    title
    content
    html
    articleStatus
    createdAt
    updatedAt
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
