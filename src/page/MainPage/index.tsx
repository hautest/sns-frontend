import styled from "styled-components";

import {
  Button,
  LoadingIndicator,
  FixedCenterPosition,
} from "../../components";
import { postPageLayout } from "../../styles/common";
import { ContentBox } from "./ContentBox";
import { modalOn } from "../../store/slice/postSlice";
import { AddPostModal } from "./AddPostModal";
import { useAppSelector, useAppDispatch } from "src/store";

export function MainPage() {
  const isLoading = useAppSelector(({ post }) => post.loading);
  const userData = useAppSelector(({ user }) => user.userData);
  const modalVisible = useAppSelector(({ post }) => post.modalVisibleValue);
  const dispatch = useAppDispatch();

  const handleOnclickBtn = () => {
    dispatch(modalOn());
  };

  return (
    <MainBox>
      {modalVisible && <AddPostModal />}
      {!!userData && (
        <FixedCenterPosition>
          <Button size="lg" onClick={handleOnclickBtn}>
            새 글 작성
          </Button>
        </FixedCenterPosition>
      )}
      <ContentBox />
      <LoadingIconBox>
        {isLoading && <LoadingIndicator size="md" />}
      </LoadingIconBox>
    </MainBox>
  );
}

const MainBox = styled.div`
  ${postPageLayout}
`;

const LoadingIconBox = styled.div`
  margin: 0 auto;
`;
