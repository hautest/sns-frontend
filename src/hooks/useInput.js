import { useState } from "react";

export const useInput = (initialValue = "") => {
  const [state, setState] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setState(value);
  };

  return [state, onChange];
};
