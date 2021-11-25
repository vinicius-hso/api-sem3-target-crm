import React, { useContext, useEffect } from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "ui/components/Welcome/welcome.style";
import { Button } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import AuthContext from "contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";

interface WelcomeProps {
  user: IUser;
}

const Welcome = ({ user }: WelcomeProps) => {
  const { loged, setUser } = useContext(AuthContext);

  useEffect(() => {
    setUser(user);
  }, []);

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
          src="welcome.png"
          alt="Seja bem vindo!"
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}): Promise<any> => {
  const data = parseCookies(req);
  let token: string = "";
  let user: any = {};

  Object.keys(data).find((key, i) => {
    if (key === "@target:token") {
      token = Object.values(data)[i];
    }
    if (key === "@target:user") {
      user = Object.values(data)[i];
    }
  });
  if (!token?.length && resolvedUrl !== "/login") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    try {
      serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await serviceApi.get("/auth/faw1efawe3f14aw8es3v6awer51xx3/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  if (user) {
    user = JSON.parse(user);
  }
  return {
    props: {
      user,
      token,
    },
  };
};
