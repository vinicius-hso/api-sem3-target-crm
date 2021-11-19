import { useContext } from "react";
import AuthContext from "../../../../contexts/AuthContext";
import UserService from "data/services/UserService";
import { toast } from "react-toastify";

export const useSessionUserPage = () => {
  const { user } = useContext(AuthContext);

  const editUser = async (userId: any, data: any) => {
    const res = await UserService.editUser(userId, data);
    if (res.status === "success") {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return res;
  };

  const editUserPassword = async (userId: any, data: any) => {
    const res = await UserService.editUserPassword(userId, data);
    if (res.status === "success") {
      toast.success(`Senha alterada com sucesso!`);
    } else if (res.status === "error") {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
    }
    return res;
  };

  return {
    user,
    editUser,
    editUserPassword,
  };
};
