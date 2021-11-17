import { AppBar, Avatar, Drawer, IconButton } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

const drawerWidth = 240;

export const Root = styled("div")`
  display: flex;
`;

export const DrawerStyled = styled("nav")`
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 80px;
  }
`;

export const AppBarStyled = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.05);

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: calc(100vw);
    margin-left: 240px;
    .MuiToolbar-root {
      height: 80px;
    }
  }
`;

export const ToolbarHeaderStyled = styled("div")`
  display: grid;
  width: 100vw;
  padding: 6px ${({ theme }) => theme.spacing(2)};
  align-items: center;
  grid-template-columns: 40px 1fr 30px;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: ${({ theme }) => theme.spacing(1)} 0;
    grid-template-columns: 120px 1fr 60px;
  }
`;

export const UserPictureStyled = styled(Avatar)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: bold;
  width: 30px;
  height: initial;
  aspect-ratio: 1;
  font-size: 16px;
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 40px;
  } ;
`;

export const MenuButton = styled(IconButton)`
  margin-right: ${({ theme }) => theme.spacing(2)};
  margin-left: -${({ theme }) => theme.spacing(2)};

  display: "none";
  ${({ theme }) => theme.breakpoints.up("md")} {
    display: "none";
    width: 10px;
  } ;
`;

export const ToolbarStyled = styled("div")`
  ${({ theme }) => theme.mixins.toolbar}
  min-height: 0;
`;

export const DrawerPaper = styled(Drawer)`
  width: ${drawerWidth}px;
  .MuiDrawer-paper {
    border: 0;
  }
`;

export const ContentStyled = styled("main")`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  margin-left: ${({ theme }) => theme.spacing(8)};
  margin-top: 50px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin: 0 auto;
  }
`;

export const HeaderSpace = styled("div")`
  height: 36px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    height: 56px;
  }
`;
export const DrawerContainer = styled("div")`
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;

export const HeaderLogoStyled = styled("img")`
  height: 40px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.up("md")} {
    margin: 0 auto;
    height: 60px;
  }
`;
