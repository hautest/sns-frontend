import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { modalOff } from "../store/slice/postSlice";
import { Icon, Input, Button, Typography, Modal, LoadingIndicator } from ".";
import { createPostRequest } from "../store/slice/postSlice";
import { useInput } from "../hooks";
import { flexColumnCenter, flexColumn } from "../styles/common";
import { useValidatedInputValue } from "../hooks";
import { patchUpdateRequest } from "../store/slice/userSlice";

export function InputAndButtonInModal({ type }) {
  const [desc, onChangeDesc] = useInput("");
  const [title, onChangeTitle] = useInput("");
  const isLoading = useSelector(({ post }) => post.loading);
  const dispatch = useDispatch();

  const EMAIL_REGEX =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const NICK_NAME_REGEX = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,9}$/;
  const email = useValidatedInputValue("", EMAIL_REGEX);
  const nickname = useValidatedInputValue("", NICK_NAME_REGEX);

  const typeContent =
    type === "modify"
      ? {
          title: "내정보 수정",
          firstPlaceholder: "닉네임",
          secondPlaceholder: "이메일",
          buttonValue: "수정",
          firstInputValue: nickname.value,
          firstInputState: nickname.status,
          firstInputOnChange: nickname.onChange,
          secondInputValue: email.value,
          secondInputState: email.status,
          secondInputOnChange: email.onChange,
        }
      : {
          title: "게시글 작성",
          firstPlaceholder: "포스트 제목",
          secondPlaceholder: "포스트 내용 (최대 300글자까지 작성가능합니다)",
          buttonValue: "등록",
          firstInputValue: title,
          firstInputOnChange: onChangeTitle,
          secondInputValue: desc,
          secondInputOnChange: onChangeDesc,
        };
  const handleOnsubmit = (e) => {
    e.preventDefault();
    if (type === "modify") {
      dispatch(
        patchUpdateRequest({ email: email.value, nickname: nickname.value })
      );
    } else {
      dispatch(createPostRequest({ title, desc }));
    }
  };

  return (
    <Modal visible>
      <ModalChildBox onSubmit={handleOnsubmit}>
        <IconBox onClick={() => dispatch(modalOff())}>
          <Icon name="close" size="16px" />
        </IconBox>
        <Typography variant="subtitle">{typeContent.title}</Typography>
        <InputButtonBox>
          <InputBox>
            <Input
              placeholder={typeContent.firstPlaceholder}
              value={typeContent.firstInputValue}
              onChange={typeContent.firstInputOnChange}
              state={typeContent.firstInputState}
            />
            <Input
              placeholder={typeContent.secondPlaceholder}
              value={typeContent.secondInputValue}
              onChange={typeContent.secondInputOnChange}
              state={typeContent.secondInputState}
            />
          </InputBox>
          <Button
            size="md"
            disabled={
              type === "modify"
                ? typeContent.firstInputState !== "success" ||
                  typeContent.secondInputState !== "success"
                : isLoading
            }
          >
            {typeContent.buttonValue}
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
