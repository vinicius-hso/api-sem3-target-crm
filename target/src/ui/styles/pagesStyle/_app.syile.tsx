import { AppBar } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const AppContainer = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 auto;
`;
export const NavContainer = styled("div")`
  display: grid;
  grid-template-columns: 100px 1fr;
  min-height: calc(100vh - 100px);
  z-index: 1;
`;
