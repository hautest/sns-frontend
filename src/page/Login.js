import { useEffect } from "react";
import { LabelAndInput, Button, Modal, LoadingIndicator } from "../components";
import { ButtonBox } from "./SignUp/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks";

export function Login() {
  const dispatch = useDispatch();
  const { loading: isLoading, userData } = useSelector(({ user }) => user);

  const [emailValue, onchangeEmailValue] = useInput("");
  const [passwordValue, onchangePasswordValue] = useInput("");
  const navigate = useNavigate();

  const handleOnsubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email: emailValue, password: passwordValue }));
  };

  useEffect(() => {
    if (!!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <>
      <Modal visible={isLoading}>
        <LoadingIndicator />
      </Modal>
      <form onSubmit={handleOnsubmit}>
        <LabelAndInput
          label="이메일"
          value={emailValue}
          onChange={onchangeEmailValue}
        />
        <LabelAndInput
          label="비밀번호"
          value={passwordValue}
          onChange={onchangePasswordValue}
          type="password"
        />
        <ButtonBox>
          <Button size="lg">로그인</Button>
        </ButtonBox>
      </form>
    </>
  );
}