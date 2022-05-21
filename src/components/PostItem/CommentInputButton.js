import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { flexSpaceBetween } from "../../styles/common";
import { Input, Button, LoadingIndicator } from "..";
import { useInput } from "../../hooks/useInput";
import { createCommentRequest } from "../../store/slice/postSlice";

export function CommentInputButton({ id }) {
  const loading = useSelector(({ post }) => post.createCommentLoading === id);
  const dispatch = useDispatch();
  const [desc, onChangeDesc, setDesc] = useInput("");

  const handleOnsubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentRequest({ postId: id, desc }));
    setDesc("");
  };
  return (
    <StyledCommentInputButton onSubmit={handleOnsubmit}>
      <Input
        placeholder="댓글 달기 (최대 100글자)"
        maxLength="100"
        value={desc}
        onChange={onChangeDesc}
      />
      <Button size="sm" disabled={loading}>
        게시 {loading && <LoadingIndicator size="14px" color="white" />}
      </Button>
    </StyledCommentInputButton>
  );
}

const StyledCommentInputButton = styled.form`
  ${flexSpaceBetween}
  gap: ${({ theme }) => theme.spacing.sm};
`;
