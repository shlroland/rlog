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

export interface PostItem {
  _id: string;
  excerpt: string;
  isRecommended: boolean;
  isCommentable: boolean;
  category: string;
  tags: string[];
  title: string;
  content: string;
  html: string;
  articleStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DraftPostItem {
  input: Partial<PostItem>;
}

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

export interface DraftResult {
  saveDraft: { _id: string; updatedAt: string };
}
