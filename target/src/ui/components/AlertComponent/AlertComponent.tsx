import { AlertTitle, Box, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AlertContainer, AlertStyled } from "./AlertComponent.style";

interface AlertProps {
  title: string;
  severity: any;
  message: string | JSX.Element;
  //   isOpen: boolean;
}

const Alert: React.FC<AlertProps> = ({ severity, message, title }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          console.log(oldProgress);
          clearInterval(timer);
          return;
        }
        const diff = 10;
        return Math.min(oldProgress - diff, 100);
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <AlertContainer>
      <AlertStyled severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </AlertStyled>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </AlertContainer>
  );
};
export default Alert;
