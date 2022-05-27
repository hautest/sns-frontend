import styled, { keyframes } from "styled-components";

import { Icon } from "./Icon";
import { ThemeColorType } from "src/styles";

interface LoadingIndicatorInterface {
  size?: string;
  color: ThemeColorType;
}

export function LoadingIndicator({
  size = "32px",
  color,
}: LoadingIndicatorInterface) {
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
  display: flex;
  & > svg {
    animation: ${animation} 1.5s ease infinite;
    transform-origin: center;
  }
`;
