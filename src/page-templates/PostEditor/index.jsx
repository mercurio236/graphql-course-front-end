import { PostForm } from '../../components/PostForm';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GQL_POST } from 'graphql/queries/post';
import { useEffect } from 'react';
import { Loading } from 'components/Loading';
import { GQL_UPDATE_POST } from 'graphql/mutations/post';

export const PostEditor = () => {
  const { id } = useParams();

  const [getPost, { loading, error, data }] = useLazyQuery(GQL_POST);
  const [updatePost, { error: updateError }] = useMutation(GQL_UPDATE_POST, {
    onError() {},
    onCompleted() {
      toast.success('Post atualizado com sucesso!');
    },
  });

  useEffect(() => {
    if (!id) return;
    getPost({
      variables: {
        id,
      },
    });
  }, [id, getPost]);

  const handleSubmir = (formValue) => {
    if (id) return handleUpdate(formValue);
    return handleCreate(formValue);
  };

  const handleUpdate = async (formValue) => {
    await updatePost({
      variables: {
        postId: id,
        title: formValue?.title,
        body: formValue?.body,
      },
    });
  };

  const handleCreate = async (formValue) => {};

  if (loading) return <Loading loading={loading} />;

  const formError = error
    ? error.message
    : updateError
    ? updateError.message
    : '';

  return (
    <>
      <Helmet title="Edit/Create Post - GraphQL + Apollo-Client - Arley Souto" />

      <PostForm
        handleSubmitCb={handleSubmir}
        post={data?.post}
        formError={formError}
      />
    </>
  );
};
