import React from "react";
import TextField from "../TextField/TextField";
import {
  Icon,
  InputAdornment,
  StandardTextFieldProps,
  useTheme,
} from "@material-ui/core";
import { InputContainer } from "./TextFieldMaskLogin.style";

export interface TextFieldMaskProps extends StandardTextFieldProps {
  mask?: string;
  icon?: string;
}

const TextFieldMaskLogin: React.FC<TextFieldMaskProps> = ({
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
                color={props.error ? "error" : "primary"}
                fontSize="small"
              />
            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default TextFieldMaskLogin;
