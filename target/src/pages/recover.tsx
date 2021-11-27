import React from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import {
  FormContainer,
  RecoverContainer,
  ImageContainer,
} from "@styles/pagesStyle/recover.styles";
import Title from "ui/components/Title/Title";
import { useRouter } from "next/dist/client/router";
import Dialog from "ui/components/Dialog/Dialog";
import { useRecoverPage } from "data/services/hooks/PageHooks/RecoverPageHook";
import Head from "next/head";
import { GetStaticProps } from "next";

function PassRecover() {
  const currentRouter = useRouter();

  const {
    password,
    password2,
    setPassword,
    setPassword2,
    hasError,
    setMessage,
    isLoading,
    passwordIsValid,
    passwordIsSame,
    recover,
    hasMessage,
    passwordVerification,
    passwordSame,
  } = useRecoverPage();

  return (
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Head>
        <title>Recuperar senha | Target</title>
      </Head>

      <ImageContainer>
        <img
          src="logo.png"
          alt="logo"
          height="100px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>

      <Title title={""} subtitle={<p>Redefinir senha</p>}></Title>

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

        <TextFieldMask
          label={"Nova senha"}
          fullWidth
          variant={"standard"}
          size="medium"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={passwordVerification}
          error={!passwordIsValid}
          helperText={
            !passwordIsValid ? "A senha deve ter no mínimo 6 caracteres" : ""
          }
        />

        <TextFieldMask
          fullWidth
          label={"Confirmar senha"}
          variant="standard"
          type="password"
          size="medium"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
          onBlur={passwordSame}
          error={!passwordIsSame}
          helperText={!passwordIsSame ? "Os valores devem corresponder" : ""}
        />

        <Button
          variant="contained"
          sx={{ width: "150px", mt: 1 }}
          color="primary"
          onClick={() =>
            recover(
              password,
              password2,
              currentRouter.query.email,
              currentRouter.query.token
            )
          }
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            "Redefinir"
          )}
        </Button>
      </FormContainer>

      {hasMessage ? (
        <div style={{ margin: "0 auto", marginTop: "1000px" }}>
          <Dialog
            title={"Sucesso"}
            message={"Senha atualizada com sucesso"}
            type={"success"}
            open={hasMessage}
            setOpen={() => setMessage(!hasMessage)}
            result={(res) => {
              setMessage(false);
              currentRouter.push("/login");
            }}
          />
        </div>
      ) : (
        <br />
      )}

      <RecoverContainer>
        <Title
          title={""}
          subtitle={<p>Suas vendas organizadas em um único lugar!</p>}
        ></Title>
      </RecoverContainer>
    </div>
  );
}
export default PassRecover;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24 * 7, // 7 dias
  };
};
