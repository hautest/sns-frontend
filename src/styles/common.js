import { css } from "styled-components";

export const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexColumnCenter = css`
  ${flexColumn};
  align-items: center;
`;

export const flexColumnBetween = css`
  ${flexColumn};
  justify-content: space-between;
`;
