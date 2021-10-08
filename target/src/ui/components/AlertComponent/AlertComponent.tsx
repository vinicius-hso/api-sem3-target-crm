import React from "react";
import { AlertContainer, AlertStyled } from './AlertComponent.style'

interface AlertProps{
  severity: any;
  message: string | JSX.Element;
//   isOpen: boolean;
}

const Alert: React.FC<AlertProps> = ({severity, message}) => {
  
  return (
    <AlertContainer>
      <AlertStyled
        severity={severity}
      >
          {message}
      </AlertStyled>
      
    </AlertContainer>
  );
};
export default Alert;
