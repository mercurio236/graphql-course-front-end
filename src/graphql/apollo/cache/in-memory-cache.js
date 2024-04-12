import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming = []) {
            return [...existing, ...incoming];
          },
        },
      },
    },
    Post: {
      fields: {
        numberOfcomments(_, { readField }) {
          const commnets = readField('comments');
          return commnets?.length ?? 0;
        },
      },
    },
  },
});
