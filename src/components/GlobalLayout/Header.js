import styled from "styled-components";
import { Typography } from "../Typography";
import { Link } from "react-router-dom";
import { HeaderContent } from "./HeaderContent";

export function Header() {
  return (
    <StyledHeader>
      <Link to={"/"}>
        <Typography variant="title" color="primary">
          Fluss
        </Typography>
      </Link>
      <HeaderBox>
        <HeaderContent />
      </HeaderBox>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
