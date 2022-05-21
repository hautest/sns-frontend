import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Icon, LoadingIndicator } from "../../components";
import { flexColumn } from "../../styles/common";
import { useInput } from "../../hooks";
import { patchPostRequest } from "../../store/slice/postSlice";

export function ModifyDesc({
  toggleModifyDesc,
  desc,
  modifyDesc,
  id,
  setModifyDesc,
}) {
  const dispatch = useDispatch();
  const loading = useSelector(({ post }) => post.loading);
  const [inputValue, onChangeInputValue] = useInput(desc);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(patchPostRequest({ inputValue, id }));
    setModifyDesc((prev) => !prev);
  };
  return (
    <div>
      {!modifyDesc ? (
        <Button size="xs" onClick={toggleModifyDesc} disabled={loading}>
          수정{loading && <LoadingIndicator size="12px" color="white" />}
        </Button>
      ) : (
        <StyledForm onSubmit={handleOnSubmit}>
          <FlexBox>
            <Input value={inputValue} onChange={onChangeInputValue}></Input>
          </FlexBox>
          <FlexBox>
            <Button size="xs">완료</Button>
            <IconBox onClick={toggleModifyDesc}>
              <Icon name="close" onClick={toggleModifyDesc} />
            </IconBox>
          </FlexBox>
        </StyledForm>
      )}
    </div>
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
