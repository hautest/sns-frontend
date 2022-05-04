import { useState } from "react";

export const useValidatedInputValue = (initialValue = "", regex) => {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState("default"); // default | error | success

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  const onBlur = () => {
    setStatus(regex.test(value) ? "success" : "error");
  };

  return {
    value,
    status,
    onChange,
    onBlur,
  };
};
