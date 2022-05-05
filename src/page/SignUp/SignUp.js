import styled from "styled-components";
import { Button, LabelAndInput } from "../../components";
import { useValidatedInputValue } from "./useValidatedInputValue";
import { useDispatch } from "react-redux";
import { signUpRequest } from "../../store/slice/userSlice";

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const NICK_NAME_REGEX = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,9}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

export function SignUp() {
  const dispatch = useDispatch();

  const email = useValidatedInputValue("", EMAIL_REGEX);
  const nickname = useValidatedInputValue("", NICK_NAME_REGEX);
  const password = useValidatedInputValue("", PASSWORD_REGEX);
  const rePassword = useValidatedInputValue("", new RegExp(password.value));

  const inputArr = [
    { ...email, id: "email", label: "이메일" },
    { ...nickname, id: "nickname", label: "닉네임" },
    { ...password, id: "password", label: "비밀번호", type: "password" },
    {
      ...rePassword,
      id: "rePassword",
      label: "비밀번호 확인",
      type: "password",
    },
  ];

  const buttonDisabled = inputArr.some(({ status }) => status !== "success");

  const handleSignUp = () => {
    dispatch(
      signUpRequest({
        email: email.value,
        nickname: nickname.value,
        password: password.value,
      })
    );
  };

  return (
    <div>
      {inputArr.map((value) => (
        <LabelAndInput key={value.id} {...value} />
      ))}
      <ButtonBox>
        <Button
          size="lg"
          disabled={buttonDisabled}
          onClick={() => handleSignUp()}
        >
          회원가입
        </Button>
      </ButtonBox>
    </div>
  );
}

export const ButtonBox = styled.div`
  margin: 0 auto;
  width: fit-content;
`;
