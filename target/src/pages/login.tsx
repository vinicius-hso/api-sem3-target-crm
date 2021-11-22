import React from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import Title from "ui/components/Title/Title";
import {
  FormContainer,
  LoginContainer,
  LoginRightContainer,
} from "@styles/pagesStyle/login.styles";
import CustomLink from "ui/components/Link/Link";

import Welcome from "ui/components/Welcome/welcome";
import TextFieldMaskLogin from "ui/components/Input/TextFieldLogin/TextFieldMaskLogin";
import { ImageContainer } from "ui/components/Welcome/welcome.style";
import Head from "next/head";
import { useLoginPage } from "data/services/hooks/PageHooks/loginPageHook";
import { GetServerSideProps } from "next";
import { parseCookies } from "../data/services/cookie/index";

function HomePage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    hasError,
    emailIsValid,
    passwordIsValid,
    login,
    passwordVerification,
    emailVerification,
  } = useLoginPage();

  return (
    <LoginContainer>
      <Welcome />
      <Head>
        <title>Login | Target</title>
      </Head>

      <LoginRightContainer>
        <div style={{ margin: "0 auto", marginTop: "36px" }}>
          <hr />
          <ImageContainer>
            <img
              src="logo-a.png"
              alt="logo"
              height="75px"
              width="auto"
              text-align="center"
              justify-content="center"
              align-items="center"
            />
          </ImageContainer>
          <br />

          <Title
            title={""}
            subtitle={<p>Faça login para acessar sua área restrita</p>}
            subtitleColor="#ddd"
          ></Title>

          <FormContainer>
            {hasError ? (
              <Typography
                sx={{ maxWidth: "280px" }}
                variant="caption"
                color="error"
              >
                <i className="fa fa-info-circle" /> {hasError}
              </Typography>
            ) : (
              ""
            )}
            <TextFieldMaskLogin
              label={"E-mail"}
              fullWidth
              variant={"standard"}
              icon="fa fa-envelope"
              size="medium"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={emailVerification}
              error={!emailIsValid}
              helperText={!emailIsValid ? "Formato inválido" : ""}
            />
            <TextFieldMaskLogin
              fullWidth
              label={"Senha"}
              variant="standard"
              icon="fa fa-unlock-alt"
              type="password"
              size="medium"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={passwordVerification}
              error={!passwordIsValid}
              helperText={
                !passwordIsValid ? "Deve ter no mínimo 6 caracteres" : ""
              }
            />
            <Button
              variant="contained"
              sx={{ width: "150px", mt: 3 }}
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                login(email, password);
              }}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                "Entrar"
              )}
            </Button>
            <CustomLink
              href="/recover_pass"
              text="Esqueceu a senha? Clique aqui"
              textColor="#ddd"
            />
          </FormContainer>
        </div>
      </LoginRightContainer>
    </LoginContainer>
  );
}
export default HomePage;

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
  if (token?.length && user?.length && resolvedUrl !== "/") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
      token,
    },
  };
};
