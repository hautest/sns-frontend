import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  Button,
  LoadingIndicator,
  FixedCenterPosition,
} from "../../components";
import { flexSpaceBetween } from "../../styles/common";
import { ContentBox } from "./ContentBox";
import { MainPageModal } from "./ModalChild";

export function MainPage() {
  const isLoading = useSelector(({ post }) => post.loading);
  const userData = useSelector(({ user }) => user.userData);
  const modalVisible = useSelector(({ post }) => post.modalVisibleValue);

  return (
    <MainBox>
      {modalVisible && <MainPageModal />}
      {!!userData && (
        <FixedCenterPosition>
          <Button size="lg">새 글 작성</Button>
        </FixedCenterPosition>
      )}
      <ContentBox />
      <LoadingIconBox visible={isLoading}>
        <LoadingIndicator size="16px" />
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
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  margin: 0 auto;
`;
