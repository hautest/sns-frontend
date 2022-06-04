import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { NicknameEmailBox } from "./NicknameEmailBox";
import { useNavigate } from "react-router-dom";
import { MyPosts } from "./MyPosts";
import { postPageLayout } from "../../styles/common";
import { userAtom } from "src/store";
import { ConditionalRender } from "src/components";

export function MyInformationPage() {
  const navigate = useNavigate();
  const {
    accessToken,
    user: { email, nickname },
  } = useRecoilValue(userAtom);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  return (
    <ConditionalRender
      condition={!!accessToken}
      onTrue={
        <StyledMyInformationPage>
          <NicknameEmailBox email={email} nickname={nickname} />
          <MyPosts />
        </StyledMyInformationPage>
      }
    />
  );
}

const StyledMyInformationPage = styled.div`
  ${postPageLayout}
`;
