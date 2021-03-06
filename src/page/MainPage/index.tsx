import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { Button, FixedCenterPosition } from "../../components";
import { postPageLayout } from "../../styles/common";
import { ContentBox } from "./ContentBox";
import { AddPostModal } from "./AddPostModal";
import { addNewPostModalAtom, userAtom } from "src/store";

export function MainPage() {
  const [showModal, setShowModal] = useRecoilState(addNewPostModalAtom);
  const userData = useRecoilValue(userAtom);
  const handleOnclickBtn = () => {
    setShowModal(true);
  };

  return (
    <MainBox>
      {showModal && <AddPostModal />}
      {!!userData.accessToken && (
        <FixedCenterPosition>
          <Button size="lg" onClick={handleOnclickBtn}>
            μ κΈ μμ±
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
