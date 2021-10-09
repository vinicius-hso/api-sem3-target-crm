import { Alert } from '@material-ui/core';
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const AlertContainer = styled("div")`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2000;
`;

export const AlertStyled = styled(Alert)`
  
`;
