import styled from "styled-components";
import { Header } from "./Header";
import { Main } from "./Main";

export function GlobalLayout({ children }) {
  return (
    <StyledGlobalLayout>
      <Header />
      <Main>{children}</Main>
    </StyledGlobalLayout>
  );
}

export const StyledGlobalLayout = styled.div`
  margin: 0 auto;
  min-width: 375px;
  max-width: 420px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray6};
`;
