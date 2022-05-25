import { css } from "styled-components";

export const buttonSizes = {
  lg: css`
    padding: 10px 24px;
    font-size: 18px;
    line-height: 28px;
  `,
  md: css`
    padding: 10px 16px;
    font-size: 16px;
    line-height: 24px;
  `,
  sm: css`
    padding: 6px 12px;
    font-size: 14px;
    line-height: 20px;
  `,
  xs: css`
    padding: 4px 8px;
    font-size: 12px;
    line-height: 16px;
  `,
};

export type ButtonSizeKey = keyof typeof buttonSizes;
