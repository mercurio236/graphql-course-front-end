import { GQL_LOGGOUT } from 'graphql/mutations/auth';
import { authDataManager } from 'graphql/reactive-variables/auth';

export const logout = async (client, userName, callback) => {
  authDataManager.resetVar();
  await client.mutate({
    mutation: GQL_LOGGOUT,
    variables: {
      userName,
    },
  });
  if (callback) {
    callback();
  }
};
