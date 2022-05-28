import styled from "styled-components";

import { Typography } from "..";
import { flexColumn } from "../../styles/common";
import { useToggle } from "../../hooks";
import { Comment } from "src/interface";

interface CommentBoxProps {
  comments: Comment[];
}

export function CommentBox({ comments }: CommentBoxProps) {
  const [showAllComment, toggleShowAllComment] = useToggle(false);

  const isLengthOver3 = comments.length > 3;
  const commentArr =
    showAllComment || !isLengthOver3 ? comments : comments.slice(0, 3);

  return (
    <StyledCommentBox>
      {comments &&
        commentArr.map((data) => (
          <CommentNicknameDesc key={data.id}>
            <Typography variant="body3" color="black">
              {data.commenter.nickname}
            </Typography>
            <Desc>
              <Typography variant="body4" color="gray2">
                {data.desc}
              </Typography>
            </Desc>
          </CommentNicknameDesc>
        ))}
      {isLengthOver3 && (
        <ShowAllCommentBox>
          <Typography
            variant="body3"
            color="gray3"
            onClick={() => toggleShowAllComment}
          >
            {showAllComment ? "접기" : "댓글 모두 보기"}
          </Typography>
        </ShowAllCommentBox>
      )}
    </StyledCommentBox>
  );
}

const CommentNicknameDesc = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ShowAllCommentBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCommentBox = styled.div`
  ${flexColumn}
  gap : ${({ theme }) => theme.spacing.sm};
`;

const Desc = styled.span`
  word-break: break-word;
`;
