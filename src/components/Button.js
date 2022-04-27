import { StyledButton } from "../style/StyledButton";

export function Button({ size, buttonValue, state }) {
  return (
    <>
      <StyledButton size={size} buttonValue={buttonValue} disabled={state} />
    </>
  );
}
