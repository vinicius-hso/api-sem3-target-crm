import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import {
  AppBarStyled,
  ContentStyled,
  DrawerContainer,
  DrawerPaper,
  DrawerStyled,
  HeaderLogoStyled,
  MenuButton,
  Root,
  ToolbarHeaderStyled,
} from "./NavBar.style";
import theme from "ui/theme/theme";
import { DrawerWeb } from "./Drawers/DrawerWeb";
import { DrawerMobile } from "./Drawers/DrawerMobile";
import { useNavBarComponent } from "data/services/hooks/componentHooks/NavHook";

interface Props {
  window?: () => Window;
  CurrentPage?: JSX.Element;
  style?: any;
}

export default function NavBar(props: Props) {
  const {
    mobileOpen,
    navHover,
    setNavHover,
    handleDrawerToggle,
    isAdmin,
    user,
  } = useNavBarComponent();

  const { window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root style={props.style}>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <ToolbarHeaderStyled>
          <MenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <i
              className="fa fa-bars"
              style={{
                color: theme.palette.primary.main,
              }}
            ></i>
          </MenuButton>
          <HeaderLogoStyled src={"logo.png"} alt={"Target"} />
        </ToolbarHeaderStyled>
      </AppBarStyled>
      <DrawerStyled aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <DrawerPaper
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <DrawerMobile navHover={navHover} isAdmin={isAdmin} user={user} />
          </DrawerPaper>
        </Hidden>
        <Hidden xsDown>
          <DrawerContainer>
            <DrawerPaper
              onMouseEnter={() => setNavHover(true)}
              onMouseLeave={() => setNavHover(false)}
              variant="permanent"
            >
              <DrawerWeb navHover={navHover} isAdmin={isAdmin} user={user} />
            </DrawerPaper>
          </DrawerContainer>
        </Hidden>
      </DrawerStyled>
      <ContentStyled style={{ marginLeft: navHover ? "104px" : "-6px" }}>
        {props.CurrentPage}
      </ContentStyled>
    </Root>
  );
}
