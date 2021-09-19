import React from "react";
import { Alert, Button, Typography, CircularProgress } from "@material-ui/core";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer, RecoverContainer, ImageContainer } from "@styles/pagesStyle/recover.styles";
import { useLoginPage } from "data/services/hooks/PageHooks/loginPageHook";
import Title from "ui/components/Title/Title";

function EmailRecover() {
  const {
    email,
    setEmail,
    isLoading,
    data,
    hasError,
    hasMessage,
    emailIsValid,
    recoverPass,
    emailVerification,
  } = useLoginPage();

  return (
    <div style={{ margin: "auto 0", marginTop: "100px"}}>
      <ImageContainer>
      <img src="logo.png" alt="logo" 
      height="100px" 
      width="auto"
      text-align="center"
      justify-content= "center"
      align-items="center"
      />
    </ImageContainer>
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
          "Recuperar senha"
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
          helperText={
            !emailIsValid ? "Formato inválido" : ""
          }
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
        <Alert color="success">
          <h1>Email enviado!</h1>
          <p>Enviamos um email com as instruções para a redefinição de sua senha. 
            Caso não encontre em sua caixa de entrada, por favor, verifique seu Spam.</p>
        <hr />
          </Alert>
      ) : (
        <br/>
      )
      }

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
