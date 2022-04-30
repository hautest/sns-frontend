import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
html * {
    font-family: 'Roboto';
  }
input {
    box-sizing: border-box;
    border-radius: 6px;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
  }
`;
