import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClinet = new ApolloClient({
  uri: 'http://localhost:4003',
  cache: new InMemoryCache(),
});
