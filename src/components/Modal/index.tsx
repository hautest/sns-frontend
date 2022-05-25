import styled from "styled-components";
import { createPortal } from "react-dom";
import React from "react";

interface ModalInterface {
  children: React.ReactNode;
  visible: "visible" | "hidden";
  onClick: void;
}

function Portal({ children }: any): React.ReactPortal {
  const element = document.querySelector("#modal") as HTMLElement;
  return createPortal(children, element);
}

export const Modal: React.FC<ModalInterface> = function ({
  children,
  visible,
  onClick,
}) {
  return (
    <Portal>
      <StyledModal visible={visible} onClick={onClick}>
        {children}
      </StyledModal>
    </Portal>
  );
};

const StyledModal: React.FC<ModalInterface> = styled.div<ModalInterface>`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 100%;
`;
