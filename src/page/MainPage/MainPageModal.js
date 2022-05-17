import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { modalOff } from "../../store/slice/postSlice";
import {
  Icon,
  Input,
  Button,
  Typography,
  Modal,
  LoadingIndicator,
} from "../../components";
import { createPostRequest } from "../../store/slice/postSlice";
import { useInput } from "../../hooks";
import { flexColumnCenter, flexColumn } from "../../styles/common";

export function MainPageModal() {
  const [desc, onChangeDesc] = useInput("");
  const [title, onChangeTitle] = useInput("");
  const isLoading = useSelector(({ post }) => post.loading);
  const dispatch = useDispatch();

  const handleOnsubmit = (e) => {
    e.preventDefault();
    dispatch(createPostRequest({ title, desc }));
  };

  return (
    <Modal visible>
      <ModalChildBox onSubmit={handleOnsubmit}>
        <IconBox onClick={() => dispatch(modalOff())}>
          <Icon name="close" size="16px" />
        </IconBox>
        <Typography variant="subtitle">게시글 작성</Typography>
        <InputButtonBox>
          <InputBox>
            <Input
              placeholder="포스트 제목"
              value={title}
              onChange={onChangeTitle}
            />
            <Input
              placeholder="포스트 내용 (최대 300글자까지 작성가능합니다)"
              value={desc}
              onChange={onChangeDesc}
            />
          </InputBox>
          <Button size="md" disabled={isLoading}>
            등록
            {isLoading && <LoadingIndicator size="16px" color="white" />}
          </Button>
        </InputButtonBox>
      </ModalChildBox>
    </Modal>
  );
}

const ModalChildBox = styled.form`
  ${flexColumnCenter};
  ${({ theme: { colors, spacing } }) => css`
    padding: ${spacing.lg} ${spacing.md};
    border-radius: ${spacing.md};
    background-color: ${colors.white};
  `}
  position: relative;
  gap: 12px;
  min-width: 350px;
`;

const InputButtonBox = styled.div`
  ${flexColumn};
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InputBox = styled.div`
  ${flexColumn}
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconBox = styled.div`
  position: absolute;
  ${({
    theme: {
      spacing: { md },
    },
  }) => css`
    top: ${md};
    right: ${md};
  `}
`;
