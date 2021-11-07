import { Stack } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const StackStyled = styled(Stack)`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
`;

export const BodyContainer = styled("div")`
  position: absolute;
  top: 150px;
  left: 150px;
  overflow: hidden;

  div {
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    margin-top: ${({ theme }) => theme.spacing(6)};
    overflow: hidden;
  }
`;
