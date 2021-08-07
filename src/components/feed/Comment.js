import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ id, isMine, photoId, author, payload }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (ok) {
      //cache에서 comment 삭제
      cache.evict({ id: `Comment:${id}` });
      // apollo 3 에서 추가된 내용, modify를 이용해 comments를 줄인다.
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          //함수로 이전의 값을 넘긴다.
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment>
              <Link key={index} to={`/hashtags/${word}`}>
                {word}
              </Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  isMine: PropTypes.bool,
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
