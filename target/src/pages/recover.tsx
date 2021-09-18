import React from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer, RecoverContainer, ImageContainer } from "@styles/pagesStyle/recover.styles";
import { useRecoverPage } from "data/services/hooks/PageHooks/recoverPageHook";
import Title from "ui/components/Title/Title";


function PassRecover() {
  const {
    password1,
    password2,
    setPassword1,
    setPassword2,
    hasError,
    isLoading,
    data,
    passwordIsValid1,
    passwordIsSame,
    recover,
    passwordVerification1,
    passwordSame,
  } = useRecoverPage();

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
          "Redefinir senha"
        )}

        <TextFieldMask
          label={"Nova senha"}
          fullWidth
          variant={"standard"}
          size="medium"
          type="password"
          value={password1}
          onChange={(event) => setPassword1(event.target.value)}
          onBlur={passwordVerification1}
          error={!passwordIsValid1}
          helperText={
            !passwordIsValid1 ? "A senha deve ter no mínimo 6 caracteres" : ""
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
          onClick={() => recover(password1, password2)}
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            "Redefinir"
          )}
        </Button>
      </FormContainer>

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
