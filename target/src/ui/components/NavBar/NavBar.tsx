import React, { useEffect } from "react";
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
import { route } from "next/dist/server/router";
import { useRouter } from "next/dist/client/router";

interface Props {
  window?: () => Window;
  CurrentPage?: JSX.Element;
}

export default function NavBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navHover, setNavHover] = React.useState(false);
  const route = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    const storagedToken = localStorage.getItem("@taget:token");
    if (!storagedToken) {
      route.push("/login");
    }
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root style={{ maxHeight: "1000px" }}>
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
          <HeaderLogoStyled src={"logo.svg"} alt={"Target"} />
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
            <DrawerMobile navHover={navHover} />
          </DrawerPaper>
        </Hidden>
        <Hidden xsDown>
          <DrawerContainer>
            <DrawerPaper
              onMouseEnter={() => setNavHover(true)}
              onMouseLeave={() => setNavHover(false)}
              variant="permanent"
            >
              <DrawerWeb navHover={navHover} />
            </DrawerPaper>
          </DrawerContainer>
        </Hidden>
      </DrawerStyled>
      <ContentStyled>{props.CurrentPage}</ContentStyled>
    </Root>
  );
}
