import styled from "styled-components";

import { Typography } from "./Typography";
import { Input } from "./Input";

export function LabelAndInput({
  id,
  value,
  onChange,
  type,
  status,
  label,
  placeholder,
}) {
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
