import styled from "styled-components";
import { sizeButtonStyleData, buttonChildData } from "../styleData/buttonData";

export function Button({ size, children, disabled }) {
  return (
    <StyledButton size={size} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${sizeButtonStyleData}
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.theme.defaultColor};
  gap: 8px;
  // 버튼안에 자식요소
  & > * {
    ${buttonChildData}
    font-style: normal;
    font-weight: 600, Semi bold;
    color: ${(props) => props.theme.fontColor};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 8px;
  }
  :hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  :disabled {
    background: ${(props) => props.theme.disabledColor};
    opacity: 0.5;
  }
`;
