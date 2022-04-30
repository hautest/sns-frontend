import { css } from "styled-components";

export const inputSize = {
  lg: css`
    width: 320px;
    height: 32px;
  `,
  sm: css`
    width: 277px;
    height: 32px;
  `,
};

export const inputState = {
  success: css`
    border: 1px solid ${({ theme }) => theme.colors.success};
  `,
  false: css`
    border: 2px solid ${({ theme }) => theme.colors.warn};
  `,
};
