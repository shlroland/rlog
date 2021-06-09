import { gql } from '@apollo/client';
import type { PostItem } from '../Post/typeDefs';

export const RELEASE = gql`
  mutation Release($input: CreatePostInput!) {
    release(input: $input) {
      _id
    }
  }
`;
export interface ReleaseInput {
  input: PostItem;
}
export interface ReleaseResult {
  release: PostItem;
}

export const DRAFT = gql`
  mutation Draft($input: DraftPostInput!) {
    saveDraft(input: $input) {
      _id
      updatedAt
    }
  }
`;

export interface DraftInput {
  input: Partial<PostItem>;
}
export interface DraftResult {
  saveDraft: { _id: string; updatedAt: string };
}
