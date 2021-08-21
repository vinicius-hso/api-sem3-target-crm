import { Container, Toolbar } from "@material-ui/core";
import React from "react";
import { HeaderAppBar, HeaderLogo } from "./Header.style";

const Header: React.FC = () => {
  return (
    <HeaderAppBar position="sticky">
      <Toolbar component={Container}>
        <HeaderLogo src={"logo.svg"} alt={"Target"} />
      </Toolbar>
    </HeaderAppBar>
  );
};
export default Header;
