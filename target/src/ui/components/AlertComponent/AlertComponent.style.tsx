import { Alert, Stack } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const AlertContainer = styled(Stack)`
  position: fixed;
  top: 10px;
  right: 10px;
  max-width: 300px;
  z-index: 10000;
`;

export const AlertStyled = styled(Alert)``;
