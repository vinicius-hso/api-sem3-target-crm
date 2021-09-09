import { AppBar } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const AppContainer = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 auto;
  ::-webkit-scrollbar {
    width: 30px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 30px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-radius: 30px;
  }
`;
export const NavContainer = styled("div")`
  display: grid;
  grid-template-columns: 100px 1fr;
  min-height: calc(100vh - 100px);
  z-index: 1;
`;
