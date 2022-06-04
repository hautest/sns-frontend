import styled from "styled-components";
import { useState, FormEvent } from "react";
import { useRecoilValue } from "recoil";

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
import { usePatchPost } from "./query/usePatchPost";
import { userAtom } from "src/store";

interface DescriptionProps {
  desc: string;
  id: string;
  authorId: string;
}

export function Description({ desc, id, authorId }: DescriptionProps) {
  const userData = useRecoilValue(userAtom);
  const [inputValue, onChangeInputValue] = useInput(desc);
  const [modifyDesc, toggleModifyDesc] = useToggle(false);
  const { mutate, isLoading } = usePatchPost();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ inputValue, id });
    toggleModifyDesc();
  };

  const hasMoreDesc = desc.length > 200;
  const [showAll, setShowAll] = useState(!hasMoreDesc);
  const descPreview = `${desc.substring(0, 200)}...`;
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const isMyPost = userData.user.id === authorId;

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
                <Button
                  size="xs"
                  onClick={toggleModifyDesc}
                  disabled={isLoading}
                >
                  수정
                  {isLoading && <LoadingIndicator size="sm" color="white" />}
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
