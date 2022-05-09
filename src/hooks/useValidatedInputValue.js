import { useState } from "react";
import { useInput } from "./useInput";

export const useValidatedInputValue = (initialValue = "", regex) => {
  const [value, onValueChange] = useInput(initialValue);
  const [status, setStatus] = useState("default"); // default | error | success

  const onChange = (event) => {
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
