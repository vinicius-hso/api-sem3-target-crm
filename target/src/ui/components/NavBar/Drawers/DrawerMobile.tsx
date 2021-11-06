import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { navBarRoutes } from "data/utils/mock";
import { getNameInitials } from "data/utils/nameConfig";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { LinkStyled } from "ui/components/Link/Link.style";
import theme from "ui/theme/theme";
import { UserPictureStyled } from "../NavBar.style";

export const DrawerMobile = ({ isAdmin, navHover, user, ...props }) => {
  const [_navHover, setNavHover] = React.useState(false);
  const [userName, setUserName] = React.useState("N");

  const router = useRouter();

  useEffect(() => {
    setNavHover(navHover);
  }, [navHover]);

  useEffect(() => {
    setUserName(user?.name);
  }, [user]);

  return (
    <div
      style={{ backgroundColor: theme.palette.secondary.main, height: "100vh" }}
    >
      <ListItem
        button
        sx={{
          pl: "8px",
          backgroundColor:
            router.route === "/account"
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
          pt: "20px",
          height: "55px",
        }}
      >
        <LinkStyled href="/account" sx={{ mb: -1 }}>
          <ListItemIcon
            sx={{
              fontSize: "40px",
              color: theme.palette.primary.main,
              mb: 2,
              ml: "6px",
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
            primary="Minha conta"
          />
        </LinkStyled>
      </ListItem>

      <List>
        {navBarRoutes.map((itemMenu, index) => (
          <ListItem
            sx={{
              paddingTop: 2,
              mt: "-7px",
              display: !isAdmin && itemMenu.name === "Usuários" ? "none" : "",
            }}
            button
            key={index}
            style={{
              backgroundColor:
                router.route === itemMenu.link
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
            }}
          >
            <LinkStyled href={itemMenu.link}>
              <ListItemIcon
                sx={{
                  fontSize: "25px",
                  color:
                    router.route === itemMenu.link
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                  mb: 3,
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
                  mb: "24px",
                }}
                primary={itemMenu.name}
              />
            </LinkStyled>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
