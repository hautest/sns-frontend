import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";

import { NicknameEmailBox } from "./NicknameEmailBox";
import { getMyPostsRequest } from "../../store/slice/postSlice";
import { useNavigate } from "react-router-dom";
import { MyPosts } from "./MyPosts";
import { LoadingIndicator } from "../../components";
import { postPageLayout } from "../../styles/common";

export function MyInformationPage() {
  const { loading } = useSelector(({ post }) => post);
  const userData = useSelector(({ user }) => user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    } else {
      dispatch(getMyPostsRequest());
    }
  }, [dispatch, navigate, userData]);
  return (
    <StyledMyInformationPage>
      <NicknameEmailBox email={userData?.email} nickname={userData?.nickname} />
      <MyPosts />
      <LoadingIconBox>
        {loading && <LoadingIndicator size="16px" />}
      </LoadingIconBox>
    </StyledMyInformationPage>
  );
}

const LoadingIconBox = styled.div`
  margin: 0 auto;
`;

const StyledMyInformationPage = styled.div`
  ${postPageLayout}
`;
