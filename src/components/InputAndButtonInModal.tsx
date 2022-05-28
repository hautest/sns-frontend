import styled, { css } from "styled-components";
import { ReactNode, FormEvent } from "react";

import { modalOff } from "../store/slice/postSlice";
import { Icon, Button, Typography, Modal, LoadingIndicator } from ".";
import { flexColumnCenter, flexColumn } from "../styles/common";
import { useAppDispatch } from "src/store";

interface InputAndButtonInModalInterface {
  title: string;
  disabled: boolean;
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  buttonText: string;
}

export function InputAndButtonInModal({
  title,
  disabled,
  children,
  onSubmit,
  loading,
  buttonText,
}: InputAndButtonInModalInterface) {
  const dispatch = useAppDispatch();
  return (
    <Modal visible={true}>
      <ModalChildBox onSubmit={onSubmit}>
        <IconBox onClick={() => dispatch(modalOff())}>
          <Icon name="close" size="md" />
        </IconBox>
        <Typography variant="subtitle">{title}</Typography>
        <InputButtonBox>
          <InputBox>{children}</InputBox>
          <Button size="md" disabled={disabled}>
            {buttonText}
            {loading && <LoadingIndicator size="md" color="white" />}
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
