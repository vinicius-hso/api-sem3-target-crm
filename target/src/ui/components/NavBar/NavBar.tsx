import React from "react";
import { NavContainer, NavStyled } from "./NavBar.style";

interface TitleProps {}

const NavBar: React.FC<TitleProps> = (props) => {
  return (
    <NavStyled>
      <NavContainer>nav</NavContainer>
    </NavStyled>
  );
};

export default NavBar;
