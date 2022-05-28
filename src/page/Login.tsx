import { useEffect, FormEvent } from "react";
import {
  LabelAndInput,
  Button,
  Modal,
  LoadingIndicator,
  FixedCenterPosition,
} from "../components";
import { useAppSelector, useAppDispatch } from "src/store";
import { loginRequest } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks";

export function Login() {
  const dispatch = useAppDispatch();
  const { loading: isLoading, userData } = useAppSelector(({ user }) => user);

  const [emailValue, onchangeEmailValue] = useInput("");
  const [passwordValue, onchangePasswordValue] = useInput("");
  const navigate = useNavigate();

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginRequest({ email: emailValue, password: passwordValue }));
  };

  useEffect(() => {
    if (!!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div style={{ padding: "0 35px" }}>
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
        <FixedCenterPosition>
          <Button size="lg">로그인</Button>
        </FixedCenterPosition>
      </form>
    </div>
  );
}
