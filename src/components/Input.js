import styled from "styled-components";

export const Input = styled.input`
  width: 320px;
  height: 28px;
  border: 1px solid
    ${({ state, theme }) =>
      state === "success" ? theme.colors.success : theme.colors.gray4};
  box-sizing: border-box;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  padding: ${({ theme }) => theme.spacing.second};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
  :focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
  :invalid {
    border: 2px solid ${({ theme }) => theme.colors.warn};
  }
  :disabled {
    opacity: 0.5;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
  }
`;
