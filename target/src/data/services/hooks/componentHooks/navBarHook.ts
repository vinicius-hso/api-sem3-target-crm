import { serviceApi } from "data/services/ServiceApi";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import AuthContext from "contexts/AuthContext";

export const useNavBarComponent = () => {
  const { user } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const route = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

  useEffect(() => {
    if (!serviceApi.defaults.headers.common["Authorization"]) {
      const storedToken = localStorage.getItem("@taget:token");
      serviceApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }
  }, []);

  return {
    setMobileOpen,
    mobileOpen,
    navHover,
    route,
    setNavHover,
    isAdmin,
    handleDrawerToggle,
    user,
    tokenValidated,
  };
};
