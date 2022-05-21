import styled, { css } from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Typography } from ".";
import { flexSpaceBetween, flexColumn } from "../styles/common";
import { CommentBox } from "../page/MainPage/CommentBox";
import { CommentInputButton } from "../page/MainPage/CommentInputButton";
import { ModifyDesc } from "../page/MainPage/ModifyDesc";

export function PostItem({ title, desc, id, author, comments, authorId }) {
  const userData = useSelector(({ user }) => user.userData);
  const hasMoreDesc = desc.length > 200;
  const [showAll, setShowAll] = useState(!hasMoreDesc);
  const descPreview = `${desc.substr(0, 200)}...`;
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const [modifyDesc, setModifyDesc] = useState(false);
  const toggleModifyDesc = () => {
    setModifyDesc((prev) => !prev);
  };
  return (
    <MapContent key={id} id={id}>
      <TitleNicknameBox>
        <Typography variant="subtitle">{title}</Typography>
        <Typography variant="body1">{author.nickname}</Typography>
      </TitleNicknameBox>
      <DescBox>
        {!modifyDesc && (
          <div>
            <Typography variant="body2">
              {showAll ? desc : descPreview}
            </Typography>
            {hasMoreDesc && (
              <Typography variant="body3" color="gray3" onClick={toggleShowAll}>
                {showAll ? "접기" : "더보기"}
              </Typography>
            )}
          </div>
        )}

        {userData?.id === authorId && (
          <ModifyDesc
            toggleModifyDesc={toggleModifyDesc}
            desc={desc}
            modifyDesc={modifyDesc}
            setModifyDesc={setModifyDesc}
            id={id}
          />
        )}
      </DescBox>
      {!!userData && <CommentInputButton id={id} />}
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

const DescBox = styled.div`
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 91px;
  word-break: break-all;
  ${flexColumn}
`;
