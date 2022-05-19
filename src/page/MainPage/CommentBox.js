import { useState } from "react";
import styled from "styled-components";

import { Typography } from "../../components";

export function CommentBox({ comments }) {
  const [showAllComment, setShowAllComment] = useState(false);
  const commentArr =
    showAllComment || comments.length < 4
      ? comments
      : [comments[0], comments[1], comments[2]];
  const textValue = showAllComment ? "접기" : "댓글 모두 보기";

  const handleShowAllComment = () => {
    setShowAllComment((prev) => !prev);
  };

  return (
    <>
      {comments &&
        commentArr.map((data) => (
          <StyledCommentBox key={data.id}>
            <Typography variant="body3">{data.commenter.nickname}</Typography>
            <Typography variant="body4" color="gray2">
              {data.desc}
            </Typography>
          </StyledCommentBox>
        ))}
      {comments.length > 3 && (
        <ShowAllCommentBox>
          <Typography
            variant="body3"
            color="gray3"
            onClick={handleShowAllComment}
          >
            {textValue}
          </Typography>
        </ShowAllCommentBox>
      )}
    </>
  );
}

const StyledCommentBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ShowAllCommentBox = styled.div`
  display: flex;
  justify-content: center;
`;
