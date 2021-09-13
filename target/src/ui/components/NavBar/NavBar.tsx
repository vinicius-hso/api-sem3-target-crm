import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  AppBarStyled,
  ContentStyled,
  DrawerContainer,
  DrawerPaper,
  DrawerStyled,
  HeaderLogoStyled,
  HeaderSpace,
  MenuButton,
  Root,
  ToolbarHeaderStyled,
  ToolbarStyled,
  UserPictureStyled,
} from "./NavBar.style";
import theme from "ui/theme/theme";
import { getNameInitials } from "data/utils/nameConfig";

interface Props {
  window?: () => Window;
  CurrentPage?: JSX.Element;
}

export default function NavBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navHover, setNavHover] = React.useState(false);
  const [userName, setUserName] = React.useState("Joaquim da Silva");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWeb = (
    <div
      style={{ backgroundColor: theme.palette.secondary.main, height: "100vh" }}
    >
      <ToolbarStyled />
      <HeaderSpace />
      <Divider />
      <List>
        {[
          { name: "Negocios", icon: "fa-bar-chart" },
          { name: "Contatos", icon: "fa-address-book" },
          { name: "Empresas", icon: "fa-building" },
          { name: "Dashboard", icon: "fa-line-chart" },
        ].map((itemMenu, index) => (
          <ListItem button key={index}>
            <ListItemIcon
              sx={{
                fontSize: "40px",
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              <i className={`fa ${itemMenu.icon}`}></i>
            </ListItemIcon>
            <ListItemText
              sx={{ color: theme.palette.primary.main }}
              style={navHover ? { display: "inline" } : { display: "none" }}
              primary={itemMenu.name}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const drawerMobile = (
    <div
      style={{ backgroundColor: theme.palette.secondary.main, height: "100vh" }}
    >
      <ToolbarStyled />
      <HeaderSpace />
      <Divider />
      <List>
        {[
          { name: "Negocios", icon: "fa-bar-chart" },
          { name: "Contatos", icon: "fa-address-book" },
          { name: "Empresas", icon: "fa-building" },
          { name: "Dashboard", icon: "fa-line-chart" },
        ].map((itemMenu, index) => (
          <ListItem button key={index}>
            <ListItemIcon
              sx={{
                fontSize: "25px",
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              <i className={`fa ${itemMenu.icon}`}></i>
            </ListItemIcon>
            <ListItemText
              sx={{ color: theme.palette.primary.main }}
              primary={itemMenu.name}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

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
          <UserPictureStyled>{getNameInitials(userName)}</UserPictureStyled>
        </ToolbarHeaderStyled>
      </AppBarStyled>
      <DrawerStyled aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <DrawerPaper
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerMobile}
          </DrawerPaper>
        </Hidden>
        <Hidden xsDown>
          <DrawerContainer>
            <DrawerPaper
              onMouseEnter={() => setNavHover(true)}
              onMouseLeave={() => setNavHover(false)}
              variant="permanent"
            >
              {drawerWeb}
            </DrawerPaper>
          </DrawerContainer>
        </Hidden>
      </DrawerStyled>
      <ContentStyled>
        <ToolbarStyled />
        {props.CurrentPage}
      </ContentStyled>
    </Root>
  );
}
