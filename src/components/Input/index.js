import styled, { css } from "styled-components";
import { inputSize, inputState } from "./constants";

export const Input = styled.input`
  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.gray4};
    background: ${colors.white};
    ::placeholder {
      color: ${colors.gray4};
    }
    :focus {
      border: 2px solid ${colors.primary};
    }
    :disabled {
      opacity: 0.5;
      border: 1px solid ${colors.gray5};
    }
  `}
  ${({ state }) => inputState[state]};
  ${({ size }) => inputSize[size]};
  padding: ${({ theme }) => theme.spacing.sm};
`;
