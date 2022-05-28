import { ReactNode } from "react";
import styled from "styled-components";
import { Header } from "./Header";

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <StyledGlobalLayout>
      <Header />
      <Main>{children}</Main>
    </StyledGlobalLayout>
  );
}

const StyledGlobalLayout = styled.div`
  margin: 0 auto;
  min-width: 375px;
  max-width: 420px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray6};
`;

const Main = styled.div`
  min-width: 375px;
  max-width: 420px;
`;
