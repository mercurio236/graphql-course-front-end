import { PostForm } from '../../components/PostForm';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GQL_POST } from 'graphql/queries/post';
import { useEffect } from 'react';
import { Loading } from 'components/Loading';
import { GQL_CREATE_POST, GQL_UPDATE_POST } from 'graphql/mutations/post';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/post';

export const PostEditor = () => {
  const { id } = useParams();
  const history = useHistory();

  const [getPost, { loading, error, data }] = useLazyQuery(GQL_POST);
  const [updatePost, { error: updateError }] = useMutation(GQL_UPDATE_POST, {
    onError() {},
    onCompleted() {
      toast.success('Post atualizado com sucesso!');
    },
  });
  const [createPost, { error: createErrors }] = useMutation(GQL_CREATE_POST, {
    onError(error) {
      console.log(error);
    },
    onCompleted(data) {
      toast.success('Criado com sucesso!');
      //window.location.href = `/post/${data.createPost.id}/edit`;
      history.push(`/post/${data.createPost.id}/edit`);
    },
    update(cache, { data }) {
      const newPostRef = cache.writeFragment({
        fragment: GQL_FRAGMENT_POST,
        data: data.createPost,
        variables: {
          id: data.createPost.id,
        },
      });
      cache.modify({
        fields: {
          posts(existing) {
            return [newPostRef, ...existing];
          },
        },
      });
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

  const handleCreate = async (formValue) => {
    await createPost({
      variables: {
        title: formValue?.title,
        body: formValue?.body,
      },
    });
  };

  if (loading) return <Loading loading={loading} />;

  const formError = error
    ? error.message
    : updateError
    ? updateError.message
    : createErrors
    ? createErrors.message
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
