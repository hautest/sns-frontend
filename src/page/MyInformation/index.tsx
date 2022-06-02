import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { NicknameEmailBox } from "./NicknameEmailBox";
import { useNavigate } from "react-router-dom";
import { MyPosts } from "./MyPosts";
import { postPageLayout } from "../../styles/common";
import { userState } from "src/store";
import { ConditionalRender } from "src/components";

export function MyInformationPage() {
  const navigate = useNavigate();
  const userData = useRecoilValue(userState);
  useEffect(() => {
    if (!userData.accessToken) {
      navigate("/");
    }
  }, [navigate, userData]);
  return (
    <ConditionalRender
      condition={!!userData.accessToken}
      onTrue={
        <StyledMyInformationPage>
          <NicknameEmailBox
            email={userData?.user.email}
            nickname={userData?.user.nickname}
          />
          <MyPosts />
        </StyledMyInformationPage>
      }
    />
  );
}

const StyledMyInformationPage = styled.div`
  ${postPageLayout}
`;
