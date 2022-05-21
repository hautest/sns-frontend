import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";

import { NicknameEmailBox } from "./NicknameEmailBox";
import { useNavigate } from "react-router-dom";
import { MyPosts } from "./MyPosts";
import { postPageLayout } from "../../styles/common";

export function MyInformationPage() {
  const userData = useSelector(({ user }) => user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [dispatch, navigate, userData]);

  return (
    <StyledMyInformationPage>
      <NicknameEmailBox email={userData?.email} nickname={userData?.nickname} />
      <MyPosts />
    </StyledMyInformationPage>
  );
}

const StyledMyInformationPage = styled.div`
  ${postPageLayout}
`;
