import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export function Description({ desc, id, authorId }) {
  const dispatch = useDispatch();
  const userData = useSelector(({ user }) => user.userData);
  const loading = useSelector(({ post }) => post.patchPostLoading === id);

  const [inputValue, onChangeInputValue] = useInput(desc);
  const [modifyDesc, toggleModifyDesc] = useToggle(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(patchPostRequest({ inputValue, id }));
    toggleModifyDesc();
  };

  const hasMoreDesc = desc.length > 200;
  const [showAll, setShowAll] = useState(!hasMoreDesc);
  const descPreview = `${desc.substr(0, 200)}...`;
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const isMyPost = userData?.id === authorId;

  return (
    <DescBox>
      {!modifyDesc && (
        <div>
          <Typography variant="body2">
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
                    <Icon name="close" onClick={toggleModifyDesc} />
                  </IconBox>
                </FlexBox>
              </StyledForm>
            }
            onFalse={
              <div>
                <Button size="xs" onClick={toggleModifyDesc} disabled={loading}>
                  수정
                  {loading && <LoadingIndicator size="12px" color="white" />}
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
