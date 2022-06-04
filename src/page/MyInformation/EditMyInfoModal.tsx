import { FormEvent } from "react";

import { useValidatedInputValue } from "../../hooks";
import { InputAndButtonInModal, Input } from "../../components";
import { usePatchUser } from "./query/usePatchUser";

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const NICK_NAME_REGEX = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,9}$/;

export function EditMyInfoModal() {
  const validEmail = useValidatedInputValue("", EMAIL_REGEX);
  const validNickname = useValidatedInputValue("", NICK_NAME_REGEX);
  const { mutate, isLoading } = usePatchUser();

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email: validEmail.value, nickname: validNickname.value });
  };

  const buttonState =
    isLoading || (validEmail?.status || validNickname?.status) !== "success";

  return (
    <InputAndButtonInModal
      title="내정보 수정"
      buttonText="등록"
      loading={isLoading}
      onSubmit={handleOnsubmit}
      disabled={buttonState}
    >
      <Input
        value={validNickname.value}
        onChange={validNickname.onChange}
        placeholder="닉네임"
        state={validNickname.status}
      />
      <Input
        value={validEmail.value}
        onChange={validEmail.onChange}
        placeholder="이메일"
        state={validEmail.status}
      />
    </InputAndButtonInModal>
  );
}
