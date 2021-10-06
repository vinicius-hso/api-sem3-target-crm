import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import AuthContext from "contexts/AuthContext";

export const useNavBarComponent = () => {
  const { user } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const route = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const storagedToken = localStorage.getItem("@taget:token");
    if (!storagedToken) {
      route.push("/login");
    }
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

  return {
    setMobileOpen,
    mobileOpen,
    navHover,
    route,
    setNavHover,
    isAdmin,
    handleDrawerToggle,
  };
};
