import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, FormEvent } from "react";
import { useAppSelector } from "src/store";

import {
  Button,
  LabelAndInput,
  LoadingIndicator,
  Modal,
  FixedCenterPosition,
} from "../../components";
import { useValidatedInputValue } from "../../hooks";
import { useSignupMutation } from "./useSignupMutation";

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const NICK_NAME_REGEX = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,9}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&^])[A-Za-z\d$@$!%*#?&^]{10,}$/;

export function SignUp() {
  const { userData } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const email = useValidatedInputValue("", EMAIL_REGEX);
  const nickname = useValidatedInputValue("", NICK_NAME_REGEX);
  const password = useValidatedInputValue("", PASSWORD_REGEX);
  const rePassword = useValidatedInputValue("", new RegExp(password.value));

  const inputArr = [
    { ...email, id: "email", label: "이메일" },
    {
      ...nickname,
      id: "nickname",
      label: "닉네임",
      placeholder: "2글자 이상 10글자 이하",
    },
    {
      ...password,
      id: "password",
      label: "비밀번호",
      type: "password",
      placeholder: "10글자 이상, 숫자, 영문자, 특수문자 포함",
    },
    {
      ...rePassword,
      id: "rePassword",
      label: "비밀번호 확인",
      type: "password",
    },
  ] as const;

  const buttonDisabled = inputArr.some(({ status }) => status !== "success");

  const { mutate, isLoading } = useSignupMutation();
  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    });
  };

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [navigate, userData]);

  return (
    <StyledSignUp>
      <Modal visible={isLoading}>
        <LoadingIndicator />
      </Modal>
      <form onSubmit={handleSignUp}>
        {inputArr.map((value) => (
          <LabelAndInput key={value.id} {...value} />
        ))}
        <FixedCenterPosition>
          <Button size="lg" disabled={buttonDisabled}>
            회원가입
          </Button>
        </FixedCenterPosition>
      </form>
    </StyledSignUp>
  );
}
const StyledSignUp = styled.div`
  padding: 0 35px;
`;
