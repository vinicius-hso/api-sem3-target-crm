import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

export const useNavBarComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const route = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const storagedToken = localStorage.getItem("@taget:token");
    if (!storagedToken) {
      route.push("/login");
    }
  }, []);

  return {
    setMobileOpen,
    mobileOpen,
    navHover,
    route,
    setNavHover,
    handleDrawerToggle,
  };
};
