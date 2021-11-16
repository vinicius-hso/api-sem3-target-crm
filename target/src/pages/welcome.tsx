import React, { useContext } from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "ui/components/Welcome/welcome.style";
import { Button } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import AuthContext from "contexts/AuthContext";

const Welcome = () => {
  const { loged } = useContext(AuthContext);

  return (
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Head>
        <title>Seja bem vindo | Target</title>
      </Head>

      <Title
        title={"Seja bem-vindo(a)!"}
        subtitle={<p>Suas vendas organizadas em um único lugar!</p>}
      ></Title>

      <ImageContainer>
        <img
          src="Welcome1.png"
          alt="welcome1"
          height="300 px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />

        <div style={{ margin: "auto 0", marginTop: "50px" }}>
          <Link
            href={{
              pathname: "/",
              query: { loged },
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "200px", mt: 1 }}
              color="primary"
            >
              Acessar a aplicação
            </Button>
          </Link>
        </div>
      </ImageContainer>
    </div>
  );
};
export default Welcome;
