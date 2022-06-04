import styled from "styled-components";
import { FormEvent } from "react";

import { flexSpaceBetween } from "../../styles/common";
import { Input, Button, LoadingIndicator } from "..";
import { useInput } from "../../hooks/useInput";
import { useCreateComment } from "./query/useCreateComment";

interface CommentInputButtonProps {
  id: string;
}

const MAX_LENGTH = 100;

export function CommentInputButton({ id }: CommentInputButtonProps) {
  const [desc, onChangeDesc, setDesc] = useInput("");
  const { mutate, isLoading } = useCreateComment();

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ postId: id, desc });
    setDesc("");
  };

  return (
    <StyledCommentInputButton onSubmit={handleOnsubmit}>
      <Input
        placeholder="댓글 달기 (최대 100글자)"
        maxLength={MAX_LENGTH}
        value={desc}
        onChange={onChangeDesc}
      />
      <Button size="sm" disabled={isLoading}>
        게시 {isLoading && <LoadingIndicator size="md" color="white" />}
      </Button>
    </StyledCommentInputButton>
  );
}

const StyledCommentInputButton = styled.form`
  ${flexSpaceBetween}
  gap: ${({ theme }) => theme.spacing.sm};
`;
