import styled from "styled-components";
import { useRecoilState } from "recoil";

import { Button, FixedCenterPosition } from "../../components";
import { postPageLayout } from "../../styles/common";
import { ContentBox } from "./ContentBox";
import { AddPostModal } from "./AddPostModal";
import { useAppSelector, addNewPostModalAtom } from "src/store";

export function MainPage() {
  const userData = useAppSelector(({ user }) => user.userData);

  const [showModal, setShowModal] = useRecoilState(addNewPostModalAtom);

  const handleOnclickBtn = () => {
    setShowModal(true);
  };

  return (
    <MainBox>
      {showModal && <AddPostModal />}
      {!!userData && (
        <FixedCenterPosition>
          <Button size="lg" onClick={handleOnclickBtn}>
            새 글 작성
          </Button>
        </FixedCenterPosition>
      )}
      <ContentBox />
    </MainBox>
  );
}

const MainBox = styled.div`
  ${postPageLayout}
`;
