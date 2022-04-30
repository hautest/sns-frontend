import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  html * {
    font-family: 'Roboto';
    box-sizing: border-box;
  }
`;
