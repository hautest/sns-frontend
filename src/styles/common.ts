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

export const postItemLayout = css`
  display: flex;
  gap: 8px;
  flex-direction: column;
  border-radius: 16px;
  ${flexSpaceBetween}
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0 10px;
`;

export const postPageLayout = css`
  ${flexSpaceBetween}
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;
