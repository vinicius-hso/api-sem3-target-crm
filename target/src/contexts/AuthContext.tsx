import { serviceApi } from "data/services/ServiceApi";
import React, { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import AuthContextData from "../types/Auth";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loged, setLoged] = useState(false);
  const [cookie, setCookie] = useCookies(["@target:user"]);

  useEffect(() => {
    const getStoragedData = () => {
      const storagedToken = localStorage.getItem("@taget:token");
      const user = localStorage.getItem("user");

      if (storagedToken) {
        serviceApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storagedToken}`;
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
    setLoged(true);
    setCookie("@target:user", myToken, {
      path: "/",
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    });
    serviceApi.defaults.headers.common["Authorization"] = `Bearer ${myToken}`;
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
        loged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
