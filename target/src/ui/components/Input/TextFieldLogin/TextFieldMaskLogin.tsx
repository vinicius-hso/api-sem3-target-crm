import React from "react";
import { TextFieldLoginStyled } from "../TextField/TextField.style";
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
      <TextFieldLoginStyled
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
