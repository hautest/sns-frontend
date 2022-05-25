import { css } from "styled-components";

export const inputState = {
  success: css`
    border: 1px solid ${({ theme }) => theme.colors.success};
  `,
  error: css`
    border: 1px solid ${({ theme }) => theme.colors.warn};
  `,
};

export type InputStateKey = keyof typeof inputState;
