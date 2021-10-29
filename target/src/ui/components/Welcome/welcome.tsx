import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome = () => {
  return (
    <div style={{ margin: "auto 0", marginTop: "1px" }}>
      <hr />

      <ImageContainer>
        <img
          src="logo.png"
          alt="logo"
          height="75px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>

      <div style={{ marginTop: "5px" }}></div>

      <Title
        title={"Seja bem-vindo(a)!"}
        subtitle={<p>Suas vendas organizadas em um único lugar!</p>}
      ></Title>

      <ImageContainer>
        <img
          src="Welcome1.png"
          alt="welcome1"
          height="250px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>
    </div>
  );
};
export default Welcome;
