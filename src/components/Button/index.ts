import styled, { css } from "styled-components";
import { buttonSizes, ButtonSizeKey } from "./constants";

export const Button = styled.button<{ size: ButtonSizeKey }>`
  ${({ size }) => buttonSizes[size]};
  display: flex;
  align-items: center;
  border: none;
  border-radius: 8px;
  font-style: normal;
  font-weight: 700;
  ${({ theme: { colors, spacing } }) => css`
    gap: ${spacing.xs};
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
