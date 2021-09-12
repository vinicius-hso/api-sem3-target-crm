import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
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
  ToolbarStyled,
} from "./NavBar.style";

interface Props {
  window?: () => Window;
  CurrentPage?: JSX.Element;
}

export default function NavBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <ToolbarStyled />
      <HeaderSpace />
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <i className="fa fa-car"></i>
              ) : (
                <i className="fa fa-car"></i>
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <i className="fa fa-car"></i>
              ) : (
                <i className="fa fa-car"></i>
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
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
        <Toolbar>
          <MenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <i className="fa fa-car"></i>
          </MenuButton>
          <HeaderLogoStyled src={"logo.svg"} alt={"Target"} />
        </Toolbar>
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
            {drawer}
          </DrawerPaper>
        </Hidden>
        <Hidden xsDown>
          <DrawerContainer>
            <DrawerPaper variant="permanent" open>
              {drawer}
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
