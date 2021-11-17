import Head from "next/head";
import React, { useEffect } from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "ui/components/Welcome/welcome.style";

const Bye = () => {
  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem("@taget:token");
      localStorage.removeItem("user");
      window.location.replace("/login");
    }, 2300);
  };
  useEffect(() => {
    logout();
  }, []);

  return (
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Title
        title={"Agradeçomos sua visita!"}
        subtitle={"Obrigado por usar nossa plataforma."}
      ></Title>
      <Head>
        <title>Até breve | Target</title>
      </Head>

      <ImageContainer>
        <img
          src="welcome.png"
          alt="Agradeçomos sua visita"
          height="300px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />

        <div style={{ margin: "auto 0", marginTop: "50px" }}></div>
      </ImageContainer>
    </div>
  );
};
export default Bye;
