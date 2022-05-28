import { TypographyConstant, TypographyConstantKey } from "./constant";
import styled from "styled-components";
import { ThemeColorType } from "src/styles";

// props로 variant, color 를 받음

export const Typography = styled.p<{
  variant: TypographyConstantKey;
  color?: ThemeColorType;
}>`
  line-height: 100%;
  ${({ variant }) => TypographyConstant[variant]};
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors["black"]};
`;
