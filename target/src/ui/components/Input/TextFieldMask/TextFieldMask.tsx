import React from "react";
import TextField from "../TextField/TextField";
import {
  Icon,
  InputAdornment,
  OutlinedTextFieldProps,
  useTheme,
} from "@material-ui/core";
import { InputContainer } from "./TextFieldMask.style";

export interface TextFieldMaskProps extends OutlinedTextFieldProps {
  mask?: string;
  icon?: string;
}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
  mask,
  icon,
  value,
  onChange,
  ...props
}) => {
  const theme = useTheme();
  return (
    <InputContainer>
      <TextField
        value={value}
        onChange={onChange}
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon
                className={icon}
                color={props.error ? "error" : "disabled"}
                fontSize="small"
              />
            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default TextFieldMask;
