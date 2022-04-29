import styled, { css } from "styled-components";
import { buttonSizes } from "./constants";

export const Button = styled.button`
  ${({ size }) => buttonSizes[size]};
  border: none;
  border-radius: 8px;
  font-style: normal;
  font-weight: 700;
  ${({ theme: { colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.primary};
    :hover:enabled {
      background-color: ${colors.hoverColor};
    }
    :disabled {
      opacity: 0.5;
    }
  `}
`;
