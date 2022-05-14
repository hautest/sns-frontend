import styled, { keyframes } from "styled-components";

import { Icon } from "./Icon";

export function LoadingIndicator({ size = "32px", color, isLoading }) {
  return (
    <IconRotate isLoading={!isLoading}>
      <Icon name="loading" size={size} color={color} />
    </IconRotate>
  );
}

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const IconRotate = styled.div`
  width: fit-content;
  animation: ${animation} 1.5s ease infinite;
  display: ${({ isLoading }) => (!isLoading ? "none" : "block")};
`;
