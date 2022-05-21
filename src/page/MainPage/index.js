import { useSelector, useDispatch } from "react-redux";
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
        {isLoading && <LoadingIndicator size="16px" />}
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
