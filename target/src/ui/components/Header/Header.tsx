import { Container, Toolbar } from "@material-ui/core";
import React from "react";
import { HeaderAppBar, HeaderLogoStyled } from "./Header.style";

const Header: React.FC = () => {
  return (
    <HeaderAppBar position="sticky">
      <Toolbar component={Container}>
        <HeaderLogoStyled src={"logo.png"} alt={"Target"} />
      </Toolbar>
    </HeaderAppBar>
  );
};
export default Header;
