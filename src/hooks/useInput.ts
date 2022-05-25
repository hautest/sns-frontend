import { useState, ChangeEvent } from "react";

export const useInput = (initialValue = "") => {
  const [state, setState] = useState(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setState(value);
  };

  return [state, onChange, setState] as const;
};
