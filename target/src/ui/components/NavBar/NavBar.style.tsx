import { AppBar, Drawer, IconButton } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

const drawerWidth = 240;

export const Root = styled("div")`
  display: flex;
`;

export const DrawerStyled = styled("nav")`
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 114px;
  }
`;

export const AppBarStyled = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.05);

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: calc(100vw - 140px);
    margin-left: ${drawerWidth}px;
    .MuiToolbar-root {
      height: 100px;
    }
  }
`;
export const MenuButton = styled(IconButton)`
  margin-right: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: "none";
  } ;
`;

export const ToolbarStyled = styled("div")`
  ${({ theme }) => theme.mixins.toolbar}
`;
export const DrawerPaper = styled(Drawer)`
  width: ${drawerWidth}px;
`;
export const ContentStyled = styled("main")`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)};
`;
export const HeaderSpace = styled("div")`
  height: 36px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    height: 14px;
  }
`;
export const DrawerContainer = styled("div")`
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;
export const HeaderLogoStyled = styled("img")`
  height: 70px;

  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 90px;
  }
`;
