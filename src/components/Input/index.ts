import styled, { css } from "styled-components";
import { inputState, InputStateKey } from "./constants";

export const Input = styled.input<{ state: InputStateKey }>`
  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.gray4};
    background: ${colors.white};
    flex: 1;
    ::placeholder {
      color: ${colors.gray4};
    }
    :focus {
      border: 1px solid ${colors.primary};
    }
    :disabled {
      opacity: 0.5;
      border: 1px solid ${colors.gray5};
    }
  `}
  ${({ state }) => inputState[state]};
  padding: 10px 12px;
  border-radius: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
`;