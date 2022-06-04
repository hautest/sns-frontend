import { useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import {
  LabelAndInput,
  Button,
  Modal,
  LoadingIndicator,
  FixedCenterPosition,
} from "../../components";
import { userAtom } from "src/store";
import { useLoginMutation } from "./useLoginMutation";
import { useInput } from "../../hooks";

export function Login() {
  const userData = useRecoilValue(userAtom);

  const [emailValue, onchangeEmailValue] = useInput("");
  const [passwordValue, onchangePasswordValue] = useInput("");
  const navigate = useNavigate();
  const { mutate, isLoading } = useLoginMutation();

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email: emailValue, password: passwordValue });
  };

  useEffect(() => {
    if (!!userData.accessToken) {
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
