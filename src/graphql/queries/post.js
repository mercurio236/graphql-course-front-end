import { gql } from '@apollo/client';
import { GQL_FRAGMENT_COMMENT } from 'graphql/fragments/comment';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/post';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_POSTS_LIMIT = 2;

export const GQL_POSTS = gql`
  query GET_POSTS(
    $sort: String = "indexRef"
    #$order: ApiFilterOrder = DESC
    $start: Int = 0
    $limit: Int = ${GQL_POSTS_LIMIT}
  ) {
    posts(
      input: { _sort: $sort, _start: $start, _limit: $limit }
    ) {
      ...post
      user {
        ...user
      }
      comments {
        ...comment
        user {
          ...user
        }
      }
    }
  }

  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
  ${GQL_FRAGMENT_COMMENT}
`;

export const GQL_POST = gql`
  query GET_POST($id: ID!) {
    post(id: $id) {
      ...post
      user {
        ...user
      }
      comments {
        ...comment
        user {
          ...user
        }
      }
    }
  }
  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
  ${GQL_FRAGMENT_COMMENT}
`;
