import React, { useMemo, useRef } from "react";
import InputMask from "react-input-mask";
import TextMask from "react-text-mask";
import TextField from "../TextField/TextField";
import {
  InputAdornment,
  OutlinedTextFieldProps,
  useTheme,
} from "@material-ui/core";
import { InputContainer, InputIconStyled } from "./TextFieldMask.style";

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

  let iconColor = useMemo(() => {
    if (props.error) {
      return theme.palette.error.main;
    } else {
      return theme.palette.grey[400];
    }
  }, [props.error]);

  return (
    <InputContainer>
      <TextField
        value={value}
        onChange={onChange}
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <InputIconStyled className={icon} style={{ color: iconColor }} />
            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default TextFieldMask;
