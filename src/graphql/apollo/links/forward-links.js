import { ApolloLink } from '@apollo/client';

export const forwardLink = new ApolloLink((operation, forward) => {
  operation.setContext((prevContext) => {
    return {
      ...prevContext,
      thisCame: 'From forward link',
    };
  });
  return forward(operation);
});
