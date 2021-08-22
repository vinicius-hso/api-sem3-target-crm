import React from "react";
import { FooterContainer, FooterStyled } from "./Footer.style";

interface TitleProps {}

const Footer: React.FC<TitleProps> = (props) => {
  return (
    <FooterStyled>
      <FooterContainer>Footer</FooterContainer>
    </FooterStyled>
  );
};

export default Footer;
