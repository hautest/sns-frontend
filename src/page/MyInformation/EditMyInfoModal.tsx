import { FormEvent } from "react";

import { useValidatedInputValue } from "../../hooks";
import { InputAndButtonInModal, Input } from "../../components";
import { patchUpdateRequest } from "../../store/slice/userSlice";
import { useAppSelector, useAppDispatch } from "src/store";

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const NICK_NAME_REGEX = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,9}$/;

export function EditMyInfoModal() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(({ user }) => user.loading);

  const validEmail = useValidatedInputValue("", EMAIL_REGEX);
  const validNickname = useValidatedInputValue("", NICK_NAME_REGEX);

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      patchUpdateRequest({
        email: validEmail.value,
        nickname: validNickname.value,
      })
    );
  };

  const buttonState =
    loading || (validEmail?.status || validNickname?.status) !== "success";

  return (
    <InputAndButtonInModal
      title="내정보 수정"
      buttonText="등록"
      loading={loading}
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
