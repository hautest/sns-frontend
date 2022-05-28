import styled from "styled-components";
import { ChangeEvent } from "react";

import { Typography } from "./Typography";
import { Input } from "./Input";
import { InputStateKey } from "./Input/constants";

interface LabelAndInputInterface {
  id?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "password";
  status?: InputStateKey;
  label: string;
  placeholder?: string;
}

export function LabelAndInput({
  id,
  value,
  onChange,
  type,
  status,
  label,
  placeholder,
}: LabelAndInputInterface) {
  return (
    <StyledLabelAndInput>
      <Typography variant="body3" color="black" as="label" htmlFor={id}>
        {label}
      </Typography>
      <Input
        placeholder={placeholder || label}
        id={id}
        onChange={onChange}
        value={value}
        state={status}
        type={type}
      />
    </StyledLabelAndInput>
  );
}

const StyledLabelAndInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-bottom: 24px;
`;
