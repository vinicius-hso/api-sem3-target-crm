import { useContext } from "react";
import AuthContext from "../../../../contexts/AuthContext";
import UserService from "data/services/UserService";
import { useCookies } from "react-cookie";

export const useSessionUserPage = () => {
  const [, setCookie] = useCookies(["@target:user"]);
  const { user } = useContext(AuthContext);

  const editUser = async (userId: any, data: any) => {
    const res = await UserService.editUser(userId, data);
    if (res?.status) {
      console.log(data);

      setCookie("@target:user", JSON.stringify(data), {
        path: "/",
        maxAge: 60 * 60 * 24, //expira em 24horas
        sameSite: true,
      });
    }
  };

  const editUserPassword = async (userId: any, data: any) => {
    await UserService.editUserPassword(userId, data);
  };

  return {
    user,
    editUser,
    editUserPassword,
  };
};
