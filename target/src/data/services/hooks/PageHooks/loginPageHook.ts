import React, { useEffect, useState, useContext } from "react";
import { emailValidator } from "../../../utils/emailValidator";
import { serviceApi } from "data/services/ServiceApi";
import AuthContext from "contexts/AuthContext";
import { useRouter } from "next/dist/client/router";

export const useLoginPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [hasError, setError] = useState(""),
    [hasMessage, setMessage] = useState(false),
    [isLoading, setLoading] = useState(false),
    [emailIsValid, setEmailIsValid] = useState(true),
    [passwordIsValid, setPasswordIsValid] = useState(true),
    [data, setData] = useState("");

  const { signIn } = useContext(AuthContext);

  const router = useRouter();

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
        await serviceApi
          .post("/auth/authenticate", {
            email,
            password,
          })
          .then((res: any) => {
            signIn(res.data.token, res.data);
            router.push("/welcome");
          });
        setLoading(false);
      } catch (err) {
        setError("Email e senha não correspondem"); //COLOCAR ERRO DEPOIS DE CONFIGURAR BACK
        setLoading(false);
      }
    }
  }

  //FUNÇÃO FAZ LOGIN SE A SENHA E EMAIL ESTIVEREM VALIDOS
  async function recoverPass(email) {
    if (emailIsValid && email.length > 0) {
      setLoading(true);
      setError("");
      try {
        await serviceApi
          .post("/auth/forgot-password/", {
            email,
          })
          .then((res) => {
            if (res.status === 200) setMessage(true);
          });

        setLoading(false);
      } catch (err) {
        setError(
          "Não encontramos esse email em nossa base de dados, por favor, verifique e tente novamente."
        ); //COLOCAR ERRO DEPOIS DE CONFIGURAR BACK
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
    hasMessage,
    setMessage,
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
