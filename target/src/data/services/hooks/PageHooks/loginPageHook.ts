import React, { useEffect, useMemo, useState, useContext, useCallback } from "react";
import { emailValidator } from "../../../utils/emailValidator";
import { serviceApi } from "data/services/serviceApi";
import AuthContext from "contexts/AuthContext";

export const useLoginPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [hasError, setError] = useState(""),
    [isLoading, setLoading] = useState(false),
    [emailIsValid, setEmailIsValid] = useState(true),
    [passwordIsValid, setPasswordIsValid] = useState(true),
    [data, setData] = useState([]);

    const {signIn} = useContext(AuthContext)

  //VERIFICA SE O EMAIL É VALIDO
  function emailVerification() {
    setEmailIsValid(emailValidator(email));
  }

  //VERIFICA SE A SENHA É VALIDA
  function passwordVerification() {
    setPasswordIsValid(password.length >= 6);
  }

  //EXECUTA SEMPRE QUE O VALOR DE EMAIL OU PASSWORD MUDAD
  useEffect(() => {
    if (!emailIsValid) {
      emailVerification();
    }
    if (!passwordIsValid) {
      passwordVerification();
    }
  }, [email, password]);

  //FUNÇÃO FAZ LOGIN SE A SENHA E EMAIL ESTIVEREM VALIDOS
  async function login(email, password) {
    if (
      emailIsValid &&
      passwordIsValid &&
      password.length > 0 &&
      email.length > 0
    ) {
      setLoading(true);
      setError("");
      try {
        const { data } = await serviceApi.post<any>("/login", {
          email,
          password,
        });

        signIn(data.token)

        setData(data);
        setLoading(false);
      } catch (err) {
        setError(""); //COLOCAR ERRO DEPOIS DE CONFIGURAR BACK
        setLoading(false);
      }
    }
  }

  //FUNÇÃO FAZ LOGIN SE A SENHA E EMAIL ESTIVEREM VALIDOS
  async function recoverPass(email) {
    if (
      emailIsValid &&
      email.length > 0
    ) {
      setLoading(true);
      setError("");
      try {
        const { data } = await serviceApi.post<any>("/login", {
          email
        });

        signIn(data.token)

        setData(data);
        setLoading(false);
      } catch (err) {
        setError(""); //COLOCAR ERRO DEPOIS DE CONFIGURAR BACK
        setLoading(false);
      }
    }
  }



  return {
    email,
    setEmail,
    password,
    setPassword,
    hasError,
    isLoading,
    data,
    emailIsValid,
    passwordIsValid,
    login,
    recoverPass,
    emailVerification,
    passwordVerification,
  };
};
