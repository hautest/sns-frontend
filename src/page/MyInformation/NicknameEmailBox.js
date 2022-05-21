import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { Button, Typography } from "../../components";
import { flexColumn } from "../../styles/common";
import { modalOn } from "../../store/slice/postSlice";
import { InputAndButtonInModal } from "../../components/InputAndButtonInModal";

export function NicknameEmailBox({ email, nickname }) {
  const dispatch = useDispatch();
  const modalVisibleValue = useSelector(({ post }) => post.modalVisibleValue);

  const handleOnclick = () => {
    dispatch(modalOn());
  };

  return (
    <Padding10>
      {modalVisibleValue && <InputAndButtonInModal type="modify" />}
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
