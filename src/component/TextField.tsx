import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

function MyTextField(props: TextFieldProps) {
  
  const { label, value, onChange, ...rest } = props;

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default MyTextField;
