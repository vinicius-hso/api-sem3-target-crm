import React from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import Title from "ui/components/Title/Title";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer } from "@styles/pagesStyle/index.styles";
import { useIndexPage } from "data/services/hooks/PageHooks/indexPageHook";

function HomePage() {
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
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Title
        title={"Seja bem-vindo(a)!"}
        subtitle={<p>Faça login para acessar sua área restrita</p>}
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
          label={"E-mail"}
          fullWidth
          variant={"standard"}
          icon="fa fa-envelope"
          size="small"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={emailVerification}
          error={!emailIsValid}
          helperText={!emailIsValid ? "Formato inválido" : ""}
        />

        <TextFieldMask
          fullWidth
          label={"Senha"}
          variant="standard"
          icon="fa fa-unlock-alt"
          type="password"
          size="small"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={passwordVerification}
          error={!passwordIsValid}
          helperText={
            !passwordIsValid ? "A senha deve ter no mínimo 6 caracteres" : ""
          }
        />

        <Button
          variant="contained"
          sx={{ width: "150px", mt: 1 }}
          color="primary"
          onClick={() => login(email, password)}
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={20} color="primary" /> 
          ) : (
            "Entrar"
          )}
        </Button>

        <a href="#" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ mt: 1 }} color="GrayText">
            Esqueceu a senha?
          </Typography>
        </a>
      </FormContainer>
    </div>
  );
}
export default HomePage;
