import { AppBar, Container } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const NavStyled = styled(AppBar)`
  position: sticky;
  left: 0;
  top: 100px;
  width: 100px;
  height: calc(100vh - 100px);
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 5px 4px 8px rgba(0, 0, 0, 0.08);

  color: ${({ theme }) =>
    theme.palette.getContrastText(theme.palette.primary.main)};
`;
export const NavContainer = styled(Container)``;
