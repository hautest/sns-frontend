import styled from "styled-components";
import { Header } from "./Header";

export function GlobalLayout({ children }) {
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
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray6};
`;

const Main = styled.div`
  width: 420px;
  padding: 24px 35px;
`;
