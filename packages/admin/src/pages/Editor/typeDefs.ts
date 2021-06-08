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

export const RELEASE = gql`
  mutation Release($input: CreatePostInput!) {
    release(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const DRAFT = gql`
  mutation Draft($input: DraftPostInput!) {
    saveDraft(input: $input) {
      _id
      updatedAt
    }
  }
`;
