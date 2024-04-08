import { useMutation } from '@apollo/client';
import { AuthForm } from 'components/AuthForm';
import { Loading } from 'components/Loading';
import { GQL_LOGIN } from 'graphql/mutations/auth';
import { authDataManager } from 'graphql/reactive-variables/auth';
import { loginFormVar } from 'graphql/reactive-variables/login-form';
import { Helmet } from 'react-helmet';

export const Login = () => {
  loginFormVar.use();
  const [login, { loading, error }] = useMutation(GQL_LOGIN, {
    onError() {}, //previni que algum erro apareça na tela
    onCompleted(data) {
      authDataManager.setVar(
        loginFormVar.get().userName,
        data.login.userId,
        true,
      );
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userNameInput = form.username;
    const passwordInput = form.password;

    const variables = {
      userName: userNameInput.value,
      password: passwordInput.value,
    };
    loginFormVar.set({ ...variables });
    await login({
      variables,
    });
  };

  if (loading) return <Loading loading={loading} />;
  //if (error) return <DefaultError error={error} />;

  return (
    <>
      <Helmet title="Login - GraphQL + Apollo-Client - Arley Souto" />

      <AuthForm
        handleLogin={handleLogin}
        formDisabled={false}
        formError={error?.message}
      />
    </>
  );
};
