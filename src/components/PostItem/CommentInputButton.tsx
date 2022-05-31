import styled from "styled-components";
import { FormEvent } from "react";

import { flexSpaceBetween } from "../../styles/common";
import { Input, Button, LoadingIndicator } from "..";
import { useInput } from "../../hooks/useInput";
import { createCommentRequest } from "../../store/slice/postSlice";
import { useAppSelector, useAppDispatch } from "src/store";

interface CommentInputButtonProps {
  id: string;
}

const MAX_LENGTH = 100;

export function CommentInputButton({ id }: CommentInputButtonProps) {
  const loading = useAppSelector(
    ({ post }) => post.createCommentLoading === id
  );
  const dispatch = useAppDispatch();
  const [desc, onChangeDesc, setDesc] = useInput("");

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCommentRequest({ postId: id, desc }));
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
      <Button size="sm" disabled={loading}>
        게시 {loading && <LoadingIndicator size="md" color="white" />}
      </Button>
    </StyledCommentInputButton>
  );
}

const StyledCommentInputButton = styled.form`
  ${flexSpaceBetween}
  gap: ${({ theme }) => theme.spacing.sm};
`;
