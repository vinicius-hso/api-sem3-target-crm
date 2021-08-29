import React from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import Title from "ui/components/Title/Title";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer } from "@styles/pagesStyle/index.styles";
import { useIndexPage } from "data/services/hooks/PageHooks/indexPageHook";

export default function Home() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    data,
    hasError,
    emailIsValid,
    passwordIsValid,
    login,
    passwordVerification,
    emailVerification,
  } = useIndexPage();

  return (
    <div style={{ margin: "auto 0" }}>
      <Title
        title={"Seja bem vindo!"}
        subtitle={<p>Faça login para acessar sua area restrita.</p>}
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

        <TextFieldMask
          label={"Email"}
          fullWidth
          variant={"outlined"}
          icon="fa fa-envelope"
          size="small"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={emailVerification}
          error={!emailIsValid}
          helperText={!emailIsValid ? "Email com formato invalido" : ""}
        />

        <TextFieldMask
          fullWidth
          label={"Senha"}
          variant={"outlined"}
          icon="fa fa-unlock-alt"
          type="password"
          size="small"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={passwordVerification}
          error={!passwordIsValid}
          helperText={
            !passwordIsValid ? "Senha deve ter no minimo 6 caracteres" : ""
          }
        />

        <Button
          variant="contained"
          sx={{ width: "200px", mt: 1 }}
          color="secondary"
          onClick={() => login(email, password)}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Entrar"
          )}
        </Button>

        <a href="#" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ mt: 1 }} color="GrayText">
            Redefinir senha
          </Typography>
        </a>
      </FormContainer>
    </div>
  );
}
