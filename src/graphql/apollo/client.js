import { ApolloClient, from } from '@apollo/client';
import { cache } from './cache/in-memory-cache';
import { forwardLink } from './links/forward-links';
import { errorLink } from './links/error-link';
import { asyncLink } from './links/async-link';
import { splitLink } from './links/split-link';

export const apolloClinet = new ApolloClient({
  link: from([errorLink, forwardLink, asyncLink, splitLink]),
  cache,
});
