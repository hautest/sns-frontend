import styled from "styled-components";

export const StyledButton = styled.input.attrs((props) => ({
  type: "button",
  value: props.buttonValue,
}))`
  height: ${(props) => {
    switch (props.size) {
      case "lg":
        return "48px";
      case "md":
        return "40px";
      case "sm":
        return "32px";
      case "xs":
        return "24px";
      default:
        break;
    }
  }};
  width: ${(props) => {
    switch (props.size) {
      case "lg":
        return "107px";
      case "md":
        return "84px";
      case "sm":
        return "70px";
      case "xs":
        return "55px";
      default:
        break;
    }
  }};
  padding: ${(props) => {
    switch (props.size) {
      case "lg":
        return "10px, 24px, 10px, 24px";
      case "md":
        return "10px, 16px, 10px, 16px";
      case "sm":
        return "10px, 12px, 10px, 12px";
      case "xs":
        return "10px, 8px, 10px, 8px";
      default:
        break;
    }
  }};
  font-size: ${(props) => {
    switch (props.size) {
      case "lg":
        return "18px";
      case "md":
        return "16px";
      case "sm":
        return "14px";
      case "xs":
        return "12px";
      default:
        break;
    }
  }};
  line-height: ${(props) => {
    switch (props.size) {
      case "lg":
        return "28px";
      case "md":
        return "24px";
      case "sm":
        return "20px";
      case "xs":
        return "16px";
      default:
        break;
    }
  }};
  border: none;
  border-radius: 8px;
  background-color: #0085ff;
  color: #ffffff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px;
  :hover {
    background-color: #0065c2;
  }
  :disabled {
    background: #0085ff;
    opacity: 0.5;
  }
`;
