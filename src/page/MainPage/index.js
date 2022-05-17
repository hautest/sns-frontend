import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  Button,
  LoadingIndicator,
  FixedCenterPosition,
} from "../../components";
import { flexSpaceBetween } from "../../styles/common";
import { ContentBox } from "./ContentBox";
import { MainPageModal } from "./MainPageModal";
import { modalOn } from "../../store/slice/postSlice";

export function MainPage() {
  const isLoading = useSelector(({ post }) => post.loading);
  const userData = useSelector(({ user }) => user.userData);
  const modalVisible = useSelector(({ post }) => post.modalVisibleValue);
  const dispatch = useDispatch();

  const handleOnclickBtn = () => {
    dispatch(modalOn());
  };

  return (
    <MainBox>
      {modalVisible && <MainPageModal />}
      {!!userData && (
        <FixedCenterPosition>
          <Button size="lg" onClick={handleOnclickBtn}>
            새 글 작성
          </Button>
        </FixedCenterPosition>
      )}
      <ContentBox />
      <LoadingIconBox>
        {isLoading && <LoadingIndicator size="16px" />}
      </LoadingIconBox>
    </MainBox>
  );
}

const MainBox = styled.div`
  ${flexSpaceBetween}
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const LoadingIconBox = styled.div`
  margin: 0 auto;
`;
