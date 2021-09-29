import React, { useState, createContext, useEffect } from "react";
import AuthContextData from "../types/Auth";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getStoragedData = () => {
      const storagedToken = localStorage.getItem("@taget:token");
      const user = localStorage.getItem("user");

      if (storagedToken) {
        setToken(storagedToken);
      }
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    getStoragedData();
  }, []);

  const signIn = (myToken: string, myUser: Object): void => {
    setToken(myToken);
    localStorage.setItem("user", JSON.stringify(myUser));
    localStorage.setItem("@taget:token", myToken);
  };

  const signOut = () => {
    setToken(null);
    localStorage.removeItem("@taget:token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        signed: token,
        token,
        signIn,
        signOut,
        setToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
