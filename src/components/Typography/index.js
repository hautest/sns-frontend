import { TypographyConstant } from "./constant";
import styled from "styled-components";

// props로 variant, color 를 받음

export const Typography = styled.p`
  line-height: 100%;
  ${({ variant }) => TypographyConstant[variant]};
  color: ${({ color, theme }) => theme.colors[color]}};
`;
