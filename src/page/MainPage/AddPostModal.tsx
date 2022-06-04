import { Input, InputAndButtonInModal } from "../../components";
import { FormEvent } from "react";
import { useInput } from "../../hooks";
import { useCreatePostMutation } from "./query/useCreatePostMutation";

export function AddPostModal() {
  const [desc, onChangeDesc] = useInput("");
  const [title, onChangeTitle] = useInput("");
  const { mutate, isLoading } = useCreatePostMutation();

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ title, desc });
  };

  return (
    <InputAndButtonInModal
      title="게시글 작성"
      buttonText="등록"
      loading={isLoading}
      onSubmit={handleOnsubmit}
      disabled={isLoading}
    >
      <Input value={title} onChange={onChangeTitle} placeholder="포스트 제목" />
      <Input
        value={desc}
        onChange={onChangeDesc}
        placeholder="포스트 내용 (최대 300글자까지 작성가능합니다)"
      />
    </InputAndButtonInModal>
  );
}
