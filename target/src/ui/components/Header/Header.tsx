import { Container, Toolbar } from "@material-ui/core";
import React from "react";
import { HeaderAppBar, HeaderLogoStyled } from "./Header.style";

const Header: React.FC = () => {
  return (
    <HeaderAppBar position="sticky">
      <div style={{ display: "none" }}>
        <div
          style={{
            display: "flex",
            height: "100px",
            width: "100px",
            backgroundColor: "#6B2AEE",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="fa fa-bullseye"
            aria-hidden="true"
            style={{ color: "white", fontSize: "60px" }}
          ></i>
        </div>
        <div
          style={{
            color: "green",
            margin: 0,
            border: "2px solid black",
            backgroundColor: "black",
            position: "relative",
            bottom: 0,
          }}
        />
      </div>
      <Toolbar component={Container}>
        <HeaderLogoStyled src={"logo.svg"} alt={"Target"} />
      </Toolbar>
    </HeaderAppBar>
  );
};
export default Header;
