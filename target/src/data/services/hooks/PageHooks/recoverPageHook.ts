import React, { useEffect, useState, useCallback } from "react";
import { serviceApi } from "data/services/ServiceApi";

export const useRecoverPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [password, setPassword] = useState(""),
    [password2, setPassword2] = useState(""),
    [hasError, setError] = useState(""),
    [hasMessage, setMessage] = useState(false),
    [isLoading, setLoading] = useState(false),
    [passwordIsValid, setPasswordIsValid] = useState(true),
    [passwordIsSame, setPasswordIsSame] = useState(true);

  //VERIFICA SE A SENHA 1 É VALIDA
  function passwordVerification() {
    setPasswordIsValid(password.length >= 6);
  }

  //VERIFICA SE AS SENHAS CORRESPONDEM
  function passwordSame() {
    setPasswordIsSame(password == password2);
  }

  //EXECUTA SEMPRE QUE O VALOR DE PASSWORD MUDA
  useEffect(() => {
    if (!passwordIsValid) {
      passwordVerification();
    }
    if (!passwordIsSame) {
      passwordSame();
    }
  }, [password, password2]);

  //FUNÇÃO QUE ALTERA SENHA
  async function recover(password, password2, email, token) {
    if (
      passwordIsValid &&
      password.length > 0 &&
      password2.length > 0 &&
      passwordIsSame
    ) {
      setLoading(true);
      setError("");
      try {
        await serviceApi
          .put("auth/reset-password", {
            email,
            password,
            token,
          })
          .then((res) => {
            if (res.status === 200) setMessage(true);
          });
        setLoading(false);
      } catch (err) {
        setError(
          "Não foi possível alterar sua senha, por favor, tente novamente mais tarde."
        ); //COLOCAR ERRO DEPOIS DE CONFIGURAR BACK
        setLoading(false);
      }
    }
  }

  return {
    password,
    password2,
    setPassword,
    setPassword2,
    hasError,
    hasMessage,
    setMessage,
    isLoading,
    passwordIsValid,
    passwordIsSame,
    recover,
    passwordVerification,
    passwordSame,
  };
};
