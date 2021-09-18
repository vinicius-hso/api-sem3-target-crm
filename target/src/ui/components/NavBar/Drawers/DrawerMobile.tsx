import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { navBarRoutes } from "data/utils/mock";
import { getNameInitials } from "data/utils/nameConfig";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { LinkStyled } from "ui/components/Link/Link.style";
import theme from "ui/theme/theme";
import { UserPictureStyled } from "../NavBar.style";

export const DrawerMobile = ({ navHover, ...props }) => {
  const [_navHover, setNavHover] = React.useState(false);
  const [userName, setUserName] = React.useState("Joaquim da Silva");

  const router = useRouter();

  useEffect(() => {
    setNavHover(navHover);
  }, [navHover]);

  return (
    <div
      style={{ backgroundColor: theme.palette.secondary.main, height: "100vh" }}
    >
      <ListItem
        button
        sx={{
          paddingLeft: "8px",
          backgroundColor:
            router.route === "/dashboard"
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
          paddingTop: "20px",
          height: "55px",
        }}
      >
        <ListItemIcon
          sx={{
            fontSize: "40px",
            color: theme.palette.primary.main,
            mb: 3,
            mr: 1,
            ml: "-5px",
          }}
        >
          <UserPictureStyled
            style={{
              backgroundColor:
                router.route === "/dashboard"
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              color:
                router.route === "/dashboard"
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
              router.route === "/dashboard"
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            mb: "20px",
          }}
          primary="Perfil"
        />
      </ListItem>

      <List>
        {navBarRoutes.map((itemMenu, index) => (
          <ListItem
            sx={{ paddingTop: 2, mt: "-7px" }}
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
