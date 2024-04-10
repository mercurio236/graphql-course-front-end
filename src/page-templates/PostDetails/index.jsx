import { Post } from 'components/Post';
import { Comment } from 'components/Comment';
import { DefaultContainer } from 'components/DefaultContainer';
import { useHistory, useParams } from 'react-router-dom';
import { Edit } from '@styled-icons/material-outlined';
import { FormButton } from 'components/FormButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmButton } from 'components/ConfirmButton';
import { CommentForm } from 'components/CommentForm';
import { useQuery } from '@apollo/client';

// MOCKED DATA
import GET_POSTS_MOCK from 'mock/posts';
import { Helmet } from 'react-helmet';
import { GQL_POST } from 'graphql/queries/post';
import { Loading } from 'components/Loading';
import { DefaultError } from 'components/DefaultError';
import { useAuthVar } from 'graphql/reactive-variables/auth';
const posts = GET_POSTS_MOCK.data.posts;
const post = posts[0];

export const PostDetails = () => {
  const authVar = useAuthVar();
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(GQL_POST, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading loading={loading} />;

  if (error) return <DefaultError error={error} />;

  const post = data?.post;

  if (!post) return null;

  return (
    <>
      <Helmet title="Post Details - GraphQL + Apollo-Client - Arley Souto" />

      <Post
        id={post.id}
        title={post.title}
        body={post.body}
        user={post.user}
        createdAt={post.createdAt}
        loggedUserId={authVar.userId}
        numberOfComments={post.numberOfcomments}
      />

      {post.comments.map((comment) => {
        return (
          <Comment
            key={`post-details-comment-${comment.id}`}
            comment={comment.comment}
            createdAt={comment.createdAt}
            id={comment.id}
            user={comment.user}
          />
        );
      })}

      <CommentForm
        handleSubmit={(comment) => toast.success(`Your comment is: ${comment}`)}
      />
    </>
  );
};
