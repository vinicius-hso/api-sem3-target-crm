import React, { useMemo, useState } from "react";
import { emailValidator } from "../../../utils/emailValidator";
import { serviceApi } from "data/services/serviceApi";

export const useIndexPage = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [hasError, setError] = useState(""),
    [isLoading, setLoading] = useState(false),
    [emailIsValid, setEmailIsValid] = useState(true),
    [passwordIsValid, setPasswordIsValid] = useState(true),
    [data, setData] = useState([]);

  function emailVerification() {
    setEmailIsValid(emailValidator(email));
  }
  function passwordVerification() {
    setPasswordIsValid(password.length >= 6);
  }

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
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
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
    emailVerification,
    passwordVerification,
  };
};
