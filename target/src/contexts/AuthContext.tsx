import React, { useState, createContext, useEffect } from 'react';
import AuthContextData from "../types/Auth"

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getStoragedData = () => {
      const storagedToken = localStorage.getItem('@taget:token');

      if (storagedToken) {
        setToken(storagedToken);
      }
    };
    getStoragedData();
  }, []);

  const signIn = (myToken: string, myUser?: object): void => {
    setToken(myToken);

    localStorage.setItem('@taget:token', myToken);
  };

  const signOut = () => {
    setToken(null);

    localStorage.removeItem('@taget:token');
  };

  return (
   <AuthContext.Provider
      value={{
        signed: !!token,
        token,
        signIn,
        signOut
      }}
    >{children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
