import { onError } from '@apollo/client/link/error';
import { authDataManager } from 'graphql/reactive-variables/auth';

export const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) return;

  graphQLErrors.forEach((error) => {
    const errorCode = error && error.extensions && error.extensions.code;

    if (errorCode === 'UNAUTHENTICATED') {
      authDataManager.reset();
    }
  });
});
