import { TextField } from '@mui/material';
import React, { ChangeEventHandler } from 'react';

interface SimpleTextFieldProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  id?: string;
  type?: string;
}

const SimpleTextField = (props: SimpleTextFieldProps) => {
  return (
    <TextField
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      id={props.id}
      type={props.type}
    />
  );
}

export default SimpleTextField;
