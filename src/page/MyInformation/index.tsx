import { useEffect } from "react";
import styled from "styled-components";

import { NicknameEmailBox } from "./NicknameEmailBox";
import { useNavigate } from "react-router-dom";
import { MyPosts } from "./MyPosts";
import { postPageLayout } from "../../styles/common";
import { useAppSelector, useAppDispatch } from "src/store";
import { ConditionalRender } from "src/components";

export function MyInformationPage() {
  const userData = useAppSelector(({ user }) => user.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [dispatch, navigate, userData]);

  return (
    <ConditionalRender
      condition={!!userData}
      onTrue={
        <StyledMyInformationPage>
          <NicknameEmailBox
            email={userData!.email}
            nickname={userData!.nickname}
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
