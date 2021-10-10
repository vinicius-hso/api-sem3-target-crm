import { AlertTitle } from "@material-ui/core";
import React from "react";
import { AlertContainer, AlertStyled } from "./AlertComponent.style";

interface AlertProps {
  title: string;
  severity: any;
  message: string | JSX.Element;
  //   isOpen: boolean;
}

const Alert: React.FC<AlertProps> = ({ severity, message, title }) => {
  return (
    <AlertContainer>
      <AlertStyled severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </AlertStyled>
    </AlertContainer>
  );
};
export default Alert;
