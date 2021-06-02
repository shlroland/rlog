import { gql } from '@apollo/client';

export const USER_INFO = gql`
  query UserInfo($userId: String!) {
    getUserInfo(userId: $userId) {
      userId
      username
      email
    }
  }
`;

export interface UserInfo {
  getUserInfo: { userId: string; username: string; email: string };
}
