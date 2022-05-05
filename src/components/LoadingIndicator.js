import styled, { keyframes } from "styled-components";

import { Icon } from "./Icon";

export function LoadingIndicator({ size = "32px", color }) {
  return (
    <IconRotate>
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
  animation: ${animation} 1.5s ease infinite;
`;
