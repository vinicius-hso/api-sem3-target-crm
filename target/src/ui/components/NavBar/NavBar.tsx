import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider, Link } from "@material-ui/core";
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
  MenuButton,
  Root,
  ToolbarHeaderStyled,
  ToolbarStyled,
  UserPictureStyled,
} from "./NavBar.style";
import theme from "ui/theme/theme";
import { getNameInitials } from "data/utils/nameConfig";
import { LinkStyled } from "../Link/Link.style";

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
      <ListItem button sx={{ margin: "24px 0 -14px 0" }}>
        <LinkStyled href="/account">
          <ListItemIcon
            sx={{
              fontSize: "40px",
              color: theme.palette.primary.main,
              mb: 3,
              mr: 1,
              ml: "-5px",
            }}
          >
            <UserPictureStyled>{getNameInitials(userName)}</UserPictureStyled>
          </ListItemIcon>

          <ListItemText
            sx={{ color: theme.palette.primary.main, mb: "20px" }}
            style={navHover ? { display: "inline" } : { display: "none" }}
            primary="Perfil"
          />
        </LinkStyled>
      </ListItem>

      <Divider />
      <List>
        {[
          { name: "Negocios", icon: "fa-bar-chart", link: "/deals" },
          { name: "Contatos", icon: "fa-address-book", link: "/contacts" },
          { name: "Empresas", icon: "fa-building", link: "/companies" },
          { name: "Dashboard", icon: "fa-line-chart", link: "/dashboard" },
          { name: "Arquivados", icon: "fa-archive", link: "/archives" },
        ].map((itemMenu, index) => (
          <ListItem button key={index}>
            <LinkStyled href={itemMenu.link}>
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
                sx={{ color: theme.palette.primary.main, mb: "20px" }}
                style={navHover ? { display: "inline" } : { display: "none" }}
                primary={itemMenu.name}
              />
            </LinkStyled>
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
      <ListItem button sx={{ margin: "8px 0 -22px 0", paddingLeft: "8px" }}>
        <ListItemIcon
          sx={{
            fontSize: "40px",
            color: theme.palette.primary.main,
            mb: 3,
            mr: 1,
            ml: "-5px",
          }}
        >
          <UserPictureStyled>{getNameInitials(userName)}</UserPictureStyled>
        </ListItemIcon>
        <ListItemText
          sx={{ color: theme.palette.primary.main, mb: "20px" }}
          primary="Perfil"
        />
      </ListItem>

      <Divider />
      <List>
        {[
          { name: "Negocios", icon: "fa-bar-chart", link: "/deals" },
          { name: "Contatos", icon: "fa-address-book", link: "/contacts" },
          { name: "Empresas", icon: "fa-building", link: "/companies" },
          { name: "Dashboard", icon: "fa-line-chart", link: "/dashboard" },
          { name: "Arquivados", icon: "fa-archive", link: "/archives" },
        ].map((itemMenu, index) => (
          <ListItem button key={index}>
            <LinkStyled href={itemMenu.link}>
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
                sx={{ color: theme.palette.primary.main, mb: "24px" }}
                primary={itemMenu.name}
              />
            </LinkStyled>
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
