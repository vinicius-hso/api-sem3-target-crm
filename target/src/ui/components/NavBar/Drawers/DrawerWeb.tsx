import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { navBarRoutes } from "data/utils/mock";
import { getNameInitials } from "data/utils/nameConfig";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { LinkStyled } from "ui/components/Link/Link.style";
import theme from "ui/theme/theme";
import { UserPictureStyled } from "../NavBar.style";

export const DrawerWeb = ({ isAdmin, navHover, user, ...props }) => {
  const [_navHover, setNavHover] = React.useState(false);
  const [userName, setUserName] = React.useState("Joaquim da Silva");

  const router = useRouter();

  useEffect(() => {
    setUserName(user?.name);
  }, [user]);

  useEffect(() => {
    setNavHover(navHover);
  }, [navHover]);

  return (
    <div
      style={{ backgroundColor: theme.palette.secondary.main, height: "100vh" }}
    >
      <ListItem
        button
        sx={{ margin: "" }}
        style={{
          backgroundColor:
            router.route === "/account"
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
          paddingTop: "20px",
        }}
      >
        <LinkStyled href="/account" sx={{ mb: -1 }}>
          <ListItemIcon
            sx={{
              fontSize: "40px",
              mb: "16px",
              mr: 1,
              ml: "-5px",
              minWidth: "40px",
            }}
          >
            <UserPictureStyled
              style={{
                backgroundColor:
                  router.route === "/account"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                color:
                  router.route === "/account"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
              }}
            >
              {getNameInitials(userName)}
            </UserPictureStyled>
          </ListItemIcon>

          <ListItemText
            sx={{
              color:
                router.route === "/account"
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              mb: "20px",
            }}
            style={navHover ? { display: "inline" } : { display: "none" }}
            primary="Minha conta"
          />
        </LinkStyled>
      </ListItem>

      <List sx={{ mt: -1 }}>
        {navBarRoutes.map((itemMenu, index) => (
          <ListItem
            button
            key={index}
            style={{
              backgroundColor:
                router.route === itemMenu.link
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
              paddingTop: "20px",
              display: !isAdmin && itemMenu.name === "Usuários" ? "none" : "",
            }}
          >
            <LinkStyled href={itemMenu.link}>
              <ListItemIcon
                sx={{
                  fontSize: "30px",
                  color:
                    router.route === itemMenu.link
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                  mb: 2,
                  minWidth: "40px",
                }}
              >
                <i className={`fa ${itemMenu.icon}`}></i>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === itemMenu.link
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                  mb: "20px",
                }}
                style={navHover ? { display: "inline" } : { display: "none" }}
                primary={itemMenu.name}
              />
            </LinkStyled>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
