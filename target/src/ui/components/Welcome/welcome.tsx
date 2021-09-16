import React from "react";
import Title from "ui/components/Title/Title";
import welcome1 from "./target/public/welcome1.png";
import { ImageContainer } from "./welcome.style";

const Welcome = () => {

  return (
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Title
        title={"Seja bem-vindo(a)!"}
        subtitle={<p>Suas vendas organizadas em um único lugar!</p>}
      ></Title>
       
      <ImageContainer>
      <img src="Welcome1.png" alt="welcome1" 
      height="285px" 
      width="auto"
      text-align="center"
      justify-content= "center"
      align-items="center"
      />
    </ImageContainer>
    </div>
  );
}
export default Welcome;







