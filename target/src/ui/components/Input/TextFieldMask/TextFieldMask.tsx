import React from "react";
import InputMask from "react-input-mask";
import TextField from "../TextField/TextField";
import { InputAdornment, OutlinedTextFieldProps } from "@material-ui/core";
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
      <InputMask style={{height: '30px'}} mask={mask}>
        {() => {
          return (
              <TextField
                {...props}
/*                 InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <InputIconStyled className={icon}/>
                    </InputAdornment>
                  )
                }}
 */              />
          );
        }}
      </InputMask>
    </InputContainer>
  );
};

export default TextFieldMask;
