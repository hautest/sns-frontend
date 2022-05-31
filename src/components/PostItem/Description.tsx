import styled from "styled-components";
import { useState, FormEvent } from "react";

import {
  Button,
  Input,
  Icon,
  LoadingIndicator,
  Typography,
  ConditionalRender,
} from "..";
import { flexColumn } from "../../styles/common";
import { useInput, useToggle } from "../../hooks";
import { patchPostRequest } from "../../store/slice/postSlice";
import { useAppSelector, useAppDispatch } from "src/store";

interface DescriptionProps {
  desc: string;
  id: string;
  authorId: string;
}

export function Description({ desc, id, authorId }: DescriptionProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(({ user }) => user.userData);
  const loading = useAppSelector(({ post }) => post.patchPostLoading === id);

  const [inputValue, onChangeInputValue] = useInput(desc);
  const [modifyDesc, toggleModifyDesc] = useToggle(false);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(patchPostRequest({ inputValue, id }));
    toggleModifyDesc();
  };

  const hasMoreDesc = desc.length > 200;
  const [showAll, setShowAll] = useState(!hasMoreDesc);
  const descPreview = `${desc.substring(0, 200)}...`;
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const isMyPost = userData?.id === authorId;

  return (
    <DescBox>
      {!modifyDesc && (
        <div>
          <Typography variant="body2" color="black">
            {showAll ? desc : descPreview}
          </Typography>
          {hasMoreDesc && (
            <Typography variant="body3" color="gray3" onClick={toggleShowAll}>
              {showAll ? "접기" : "더보기"}
            </Typography>
          )}
        </div>
      )}
      <ConditionalRender
        condition={isMyPost}
        onTrue={
          <ConditionalRender
            condition={modifyDesc}
            onTrue={
              <StyledForm onSubmit={handleOnSubmit}>
                <FlexBox>
                  <Input value={inputValue} onChange={onChangeInputValue} />
                </FlexBox>
                <FlexBox>
                  <Button size="xs">완료</Button>
                  <IconBox onClick={toggleModifyDesc}>
                    <Icon name="close" />
                  </IconBox>
                </FlexBox>
              </StyledForm>
            }
            onFalse={
              <div>
                <Button size="xs" onClick={toggleModifyDesc} disabled={loading}>
                  수정
                  {loading && <LoadingIndicator size="sm" color="white" />}
                </Button>
              </div>
            }
          />
        }
      />
    </DescBox>
  );
}

const IconBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledForm = styled.form`
  ${flexColumn}
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FlexBox = styled.div`
  display: flex;
`;

const DescBox = styled.div`
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 91px;
  word-break: break-all;
  ${flexColumn}
`;
