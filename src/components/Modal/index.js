import styled from "styled-components";
import { createPortal } from "react-dom";

function Portal({ children }) {
  const element = document.querySelector("#modal");
  return createPortal(children, element);
}

export function Modal({ children, visible, onClick }) {
  return (
    <Portal>
      <StyledModal visible={visible} onClick={onClick}>
        {children}
      </StyledModal>
    </Portal>
  );
}

const StyledModal = styled.div`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
