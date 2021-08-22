import React from "react";
import InputMask from "react-input-mask";
import TextField from "../TextField/TextField";
import { OutlinedTextFieldProps } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

export interface TextFieldMaskProps extends OutlinedTextFieldProps {
  mask?: string;
  icon?: string;
}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
  icon,
  mask,
  ...props
}) => {
  return (
    <InputMask icon={"fa fa-eye"} mask={mask}>
      {() => {
        return (
          <div>
            <TextField
              {...props}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className={icon} />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>
        );
      }}
    </InputMask>
  );
};

export default TextFieldMask;
