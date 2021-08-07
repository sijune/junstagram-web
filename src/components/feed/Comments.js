import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id # 캐시에서 댓글을 삭제하기 위해서는 db로부터 id를 받아야한다.
    }
  }
`;

const CommentsConatainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.6;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 12px;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding-top: 15px;
  padding-bottom: 10px;
  $::placeholder {
    font-size: 12px;
  }
`;

const PostCommentInput = styled.input`
  width: 100%;
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate = (cache, result) => {
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const { payload } = getValues();
      setValue("payload", "");
      const newComment = {
        __typename: "Comment",
        createAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      //cache에 comment를 생성해야한다.
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      // apollo 3 에서 추가된 내용
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          //함수로 이전의 값을 넘긴다.
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );

  const onValid = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };

  return (
    <CommentsConatainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          isMine={comment.isMine}
          photoId={photoId}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", {
              required: true,
            })}
            name="payload"
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsConatainer>
  );
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;
