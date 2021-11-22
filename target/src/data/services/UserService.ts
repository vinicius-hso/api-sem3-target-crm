import { IUser } from "types/User";
import { serviceApi as api } from "./ServiceApi";
import { toast } from "react-toastify";
interface IResponse {
  status: string;
  message: string;
}
class UserService {
  async getUsers(): Promise<IUser[]> {
    try {
      const { data } = await api.get("/user");

      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const { data } = await api.get(`/user/${id}`);

      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async createUser(data: IUser): Promise<IUser> {
    try {
      const response = await api.post("/user", data);

      toast.success("Usuário criado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async editUser(userId: string, user: IUser): Promise<any> {
    try {
      await api.put(`/user/${userId}`, user);
      toast.success("Usuário atualizado com sucesso.");

      return { status: "ok" };
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return;
    }
  }

  async editUserPassword(
    userId: string,
    data: { oldPassword: string; newPassword: string }
  ): Promise<IResponse> {
    try {
      await api.put(`/user/update-password/${userId}`, data);
      toast.success("Senha atualizada com sucesso.");
      return;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return;
    }
  }

  async deleteUser(userId: string): Promise<IUser> {
    try {
      const { data } = await api.delete(`/user/${userId}`);
      toast.success("Usuário deletado com sucesso!");
      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }
}

export default new UserService();
