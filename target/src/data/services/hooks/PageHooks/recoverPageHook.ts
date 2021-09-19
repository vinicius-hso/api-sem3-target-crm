import React, { useEffect, useState, useCallback } from "react";
import { serviceApi } from "data/services/serviceApi";
import { useRouter } from "next/dist/client/router";

export const useRecoverPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [password1, setPassword1] = useState(""),
    [password2, setPassword2] = useState(""),
    [hasError, setError] = useState(""),
    [isLoading, setLoading] = useState(false),
    [passwordIsValid1, setPasswordIsValid1] = useState(true),
    [passwordIsSame, setPasswordIsSame] = useState(true),
   
    [data, setData] = useState([]);


    const router = useRouter()
    const { id } = router.query


  //VERIFICA SE A SENHA 1 É VALIDA
  function passwordVerification1() {
    setPasswordIsValid1(password1.length >= 6);
  }

    //VERIFICA SE AS SENHAS CORRESPONDEM
    function passwordSame() {
      setPasswordIsSame(password1 == password2);
    }

  
  //EXECUTA SEMPRE QUE O VALOR DE PASSWORD MUDA
  useEffect(() => {
    if (!passwordIsValid1) {
      passwordVerification1();
    }
    if (!passwordIsSame) {
      passwordSame();
    }
  }, [password1, password2]);
  
  //FUNÇÃO QUE ALTERA SENHA
  async function recover(password1, password2) {
    if (
      passwordIsValid1 &&
      password1.length > 0 &&
      password2.length > 0 &&
      passwordIsSame
    ) {
      setLoading(true);
      setError("");
      try {
        const { data } = await serviceApi.put<any>("/reset-password", {
          password1,
        });
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(""); //COLOCAR ERRO DEPOIS DE CONFIGURAR BACK
        setLoading(false);
      }
    }
  }

  return {
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
    id
  };
};
