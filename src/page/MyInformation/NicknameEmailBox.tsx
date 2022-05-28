import styled, { css } from "styled-components";

import { Button, Typography } from "../../components";
import { flexColumn } from "../../styles/common";
import { modalOn } from "../../store/slice/postSlice";
import { EditMyInfoModal } from "./EditMyInfoModal";
import { useAppSelector, useAppDispatch } from "src/store";

interface NicknameEmailBoxProps {
  email: string;
  nickname: string;
}

export function NicknameEmailBox({ email, nickname }: NicknameEmailBoxProps) {
  const dispatch = useAppDispatch();
  const modalVisibleValue = useAppSelector(
    ({ post }) => post.modalVisibleValue
  );

  const handleOnclick = () => {
    dispatch(modalOn());
  };

  return (
    <Padding10>
      {modalVisibleValue && <EditMyInfoModal />}
      <StyledNicknameEmailBox>
        <FlexGapSpacingMd>
          <Typography variant="body1" color="black">
            닉네임
          </Typography>
          <Typography variant="body1" color="black">
            {nickname}
          </Typography>
        </FlexGapSpacingMd>
        <FlexGapSpacingMd>
          <Typography variant="body1" color="black">
            이메일
          </Typography>
          <Typography variant="body1" color="black">
            {email}
          </Typography>
        </FlexGapSpacingMd>
        <div>
          <Button size="xs" onClick={handleOnclick}>
            수정하기
          </Button>
        </div>
      </StyledNicknameEmailBox>
    </Padding10>
  );
}

const StyledNicknameEmailBox = styled.div`
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme: { spacing } }) => css`
    border-radius: ${spacing.md};
    padding: ${spacing.md};
  `}
  ${flexColumn}
    gap: 24px;
`;

const FlexGapSpacingMd = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Padding10 = styled.div`
  padding: 0 10px;
`;
