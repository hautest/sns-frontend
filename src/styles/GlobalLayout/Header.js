import styled from "styled-components";
import { Typography } from "../../components/Typography";

export function Header() {
  return (
    <StyledHeader>
      <Typography variant="title" color="primary">
        Fluss
      </Typography>
      <SignUpLogInBox>
        <Typography variant="body3" color="black">
          로그인
        </Typography>
        <Typography variant="body3" color="black">
          회원가입
        </Typography>
      </SignUpLogInBox>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  // height: 52px; ?
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const SignUpLogInBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;
