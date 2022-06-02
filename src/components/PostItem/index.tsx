import styled, { css } from "styled-components";
import { useRecoilValue } from "recoil";

import { Typography } from "..";
import { flexSpaceBetween } from "../../styles/common";
import { CommentBox } from "./CommentBox";
import { CommentInputButton } from "./CommentInputButton";
import { Description } from "./Description";
import { PostItem as PostItemInterface } from "src/interface";
import { userState } from "src/store";

export function PostItem({
  title,
  desc,
  id,
  author,
  comments,
  authorId,
}: PostItemInterface) {
  const userData = useRecoilValue(userState);

  return (
    <MapContent key={id} id={id}>
      <TitleNicknameBox>
        <Typography variant="subtitle" color="black">
          {title}
        </Typography>
        <Typography variant="body1" color="black">
          {author.nickname}
        </Typography>
      </TitleNicknameBox>

      <Description desc={desc} authorId={authorId} id={id} />

      {!!userData.accessToken && <CommentInputButton id={id} />}
      <StyledCommentBox>
        {comments.length ? (
          <CommentBox comments={comments} />
        ) : (
          <Typography variant="body3" color="gray3">
            아직 작성된 댓글이 없습니다
          </Typography>
        )}
      </StyledCommentBox>
    </MapContent>
  );
}

const TitleNicknameBox = styled.div`
  ${flexSpaceBetween}
`;

const MapContent = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme: { colors, spacing } }) => css`
    background-color: ${colors.white};
    padding: ${spacing.md};
    gap: ${spacing.sm};
    border-radius: ${spacing.md};
  `}
`;

const StyledCommentBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray6};
  border-radius: 4px;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 8px;
`;
