import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

export const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4003',
  }),
);
