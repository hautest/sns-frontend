import { useState, ChangeEvent } from "react";
import { useInput } from "./useInput";

export const useValidatedInputValue = (initialValue = "", regex: RegExp) => {
  const [value, onValueChange] = useInput(initialValue);
  const [status, setStatus] = useState<"default" | "success" | "error">(
    "default"
  ); // default | error | success

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    onValueChange(event);
    setStatus(regex.test(value) ? "success" : "error");
  };

  return {
    value,
    status,
    onChange,
  };
};
