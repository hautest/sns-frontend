import { Link } from "react-router-dom";
import styled from "styled-components";

import { Typography } from "../Typography";
import { useAppSelector } from "src/store";

export const HeaderContent = () => {
  const userData = useAppSelector(({ user }) => user.userData);

  if (!!userData) {
    const userIconValue = userData.nickname[0];
    return (
      <>
        <UserIcon>
          <Typography variant="body3" color="black">
            {userIconValue}
          </Typography>
        </UserIcon>
        <Link to={"/my-information"}>
          <Typography variant="body1" color="black">
            내정보
          </Typography>
        </Link>
      </>
    );
  }
  return (
    <>
      <Link to={"/login"}>
        <Typography variant="body3" color="black">
          로그인
        </Typography>
      </Link>
      <Link to={"/sign-up"}>
        <Typography variant="body3" color="black">
          회원가입
        </Typography>
      </Link>
    </>
  );
};

const UserIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 12px;
  width: 24px;
  height: 24px;
`;
