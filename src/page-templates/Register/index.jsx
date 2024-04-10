import { RegisterForm } from 'components/RegisterForm';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

export const Register = () => {
  return (
    <>
      <Helmet title="Register - GraphQL + Apollo-Client - Arley Souto" />

      <RegisterForm
        handleSubmitCb={(sentValues) =>
          toast.success(<pre>{JSON.stringify(sentValues, null, 2)}</pre>)
        }
      />
    </>
  );
};
