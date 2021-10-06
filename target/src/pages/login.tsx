import React from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import Title from "ui/components/Title/Title";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer, LoginContainer } from "@styles/pagesStyle/login.styles";
import { useLoginPage } from "data/services/hooks/PageHooks/LoginPageHook";
import CustomLink from "ui/components/Link/Link";

import Welcome from "ui/components/Welcome/welcome";

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
  } = useLoginPage();

  return (
    <LoginContainer>
      <Welcome />
      
     <div style={{ margin: "auto 0", height: "calc(116vh - 100px)", backgroundColor: "#2D3142" }}>
       <div style={{margin: "auto 0", marginTop: "36px"}}>
        <hr/>
         <br/>

          <Title
            title={"Login"}
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
              size="medium"
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
              size="medium"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={passwordVerification}
              error={!passwordIsValid}
              helperText={
                !passwordIsValid
                  ? "Deve ter no mínimo 6 caracteres"
                  : ""
              }
            />
            <Button
              variant="contained"
              sx={{ width: "150px", mt: 3 }}
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
            <CustomLink
              href="/recover_pass"
              text="Esqueceu a senha? Clique aqui"
            />
          </FormContainer>
        </div>
      </div>
    </LoginContainer>
    
  );
}
export default HomePage;
