import React from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import {
  FormContainer,
  RecoverContainer,
  ImageContainer,
} from "@styles/pagesStyle/recover.styles";
import { useLoginPage } from "data/services/hooks/PageHooks/loginPageHook";
import Title from "ui/components/Title/Title";
import { useRouter } from "next/dist/client/router";
import Dialog from "ui/components/Dialog/Dialog";
import Head from "next/head";

function EmailRecover() {
  const currentRouter = useRouter();

  const {
    email,
    setEmail,
    isLoading,
    hasError,
    hasMessage,
    setMessage,
    emailIsValid,
    recoverPass,
    emailVerification,
  } = useLoginPage();

  return (
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Head>
        <title>Recuperação de senha | Target</title>
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

      <Title title={""} subtitle={<p>Recuperar senha</p>}></Title>

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
          label={"Email"}
          fullWidth
          variant={"standard"}
          size="medium"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={emailVerification}
          error={!emailIsValid}
          helperText={!emailIsValid ? "Formato inválido" : ""}
        />

        <Button
          variant="contained"
          sx={{ width: "150px", mt: 1 }}
          color="primary"
          onClick={() => recoverPass(email)}
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            "Enviar"
          )}
        </Button>
      </FormContainer>

      {hasMessage ? (
        <Dialog
          title={"Sucesso"}
          message={
            "Email enviado com sucesso! \n\n Enviamos um link para seu Email, que será válido por um prazo de 24 horas. \n Caso não encontre, cheque sua caixa de spam."
          }
          type={"success"}
          open={hasMessage}
          setOpen={() => setMessage(!hasMessage)}
          result={(res) => {
            setMessage(false);
            currentRouter.push("/login");
          }}
        />
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
export default EmailRecover;
