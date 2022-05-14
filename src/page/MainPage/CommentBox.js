import styled from "styled-components";

import { Typography } from "../../components";

export function CommentBox({ comments }) {
  return (
    <>
      {comments.map((data) => (
        <StyledCommentBox key={data.id}>
          <Typography variant="body3">{data.commenter.nickname}</Typography>
          <Typography variant="body4" color="gray2">
            {data.desc}
          </Typography>
        </StyledCommentBox>
      ))}
    </>
  );
}

const StyledCommentBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;
