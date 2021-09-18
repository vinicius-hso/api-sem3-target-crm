import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "ui/components/Welcome/welcome.style";
import { Button } from "@material-ui/core";
import welcome1 from "./target/public/welcome1.png";

const Welcome = () => {

  return (
    <div style={{ margin: "auto 0", marginTop: "100px"}}>
      <Title
        title={"Seja bem-vindo(a)!"}
        subtitle={<p>Suas vendas organizadas em um único lugar!</p>}
      ></Title>
       
      <ImageContainer>
      <img src="Welcome1.png" alt="welcome1" 
      height="300 px" 
      width="auto"
      text-align="center"
      justify-content= "center"
      align-items="center"
      />

      <div style={{ margin: "auto 0", marginTop: "50px"}}>
    <Button href="/"
          variant="contained"
          sx={{ width: "200px", mt: 1 }}
          color="primary">
          Acesse o Dashboard
        </Button>
        </div>  
    </ImageContainer>
    
    </div>
  );
}
export default Welcome;