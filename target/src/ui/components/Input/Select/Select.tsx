import React from "react";
import { SelectProps } from "@material-ui/core";
import { InputContainer, SelectStyled } from "./Select.style";

const Select: React.FC<SelectProps> = ({ value, onChange, ...props }) => {
  return (
    <InputContainer>
      <SelectStyled onChange={onChange} value={value} {...props} />
    </InputContainer>
  );
};
export default Select;
