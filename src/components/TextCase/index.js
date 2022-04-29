import { textCaseConstant } from "./constant";
import styled from "styled-components";
import { theme } from "../../styles";

// props로 variant, color 를 받음

export const TextCase = styled.div`
  line-height: 100%;
  font-style: normal;
  ${({ variant }) => textCaseConstant[variant]};
  color: ${({ color }) => theme.colors[color]}};
`;
