import React from "react";
import InputMask from "react-input-mask";
import TextField from "../TextField/TextField";
import { OutlinedTextFieldProps } from "@material-ui/core";
import { InputContainer, InputIconStyled } from "./TextFieldMask.style";

export interface TextFieldMaskProps extends OutlinedTextFieldProps {
  mask?: string;
  icon?: string;


}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
  mask,
  icon,
  ...props
}) => {
  return (
    <InputContainer>
      <InputIconStyled className={icon}/>
      <InputMask  mask={mask}>
        {() => {
          return (
            <div>
              <TextField
                {...props}
              ></TextField>
            </div>
          );
        }}
      </InputMask>
    </InputContainer>
  );
};

export default TextFieldMask;
