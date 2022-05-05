import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  html * {
    font-family: 'Roboto';
    box-sizing: border-box;
  }
  body {
    background-color: ${theme.colors.black};
  }
`;
