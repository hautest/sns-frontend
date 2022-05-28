import styled, { keyframes } from "styled-components";

import { Icon } from "./Icon";
import { ThemeColorType, ThemeSpacingType } from "src/styles";

interface LoadingIndicatorInterface {
  size?: ThemeSpacingType;
  color?: ThemeColorType;
}

export function LoadingIndicator({
  size = "lg",
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
