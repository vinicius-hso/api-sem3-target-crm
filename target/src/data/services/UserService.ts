import React from "react";
import { IUser } from "types/User";
import { serviceApi as api } from "./ServiceApi";
import{toast}from "react-toastify"
class UserService {
  async getUsers() {
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

  async createUser(data: IUser) {
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

  async editUser(userId, user) {
    try {
      await api.put(`/user/${userId}`, user);
     
      return { status: "success", message: "Usuário editado com sucesso!" };
    } catch (error) {
      
      return {
        status: "error",
        message:
          "Ops! algo deu errado, verifique sua conexão e tente novamente.",
      };
    }
  }

  async editUserPassword(userId, data) {
    try {
      await api.put(`/user/update-password/${userId}`, data);
  
      return { status: "success", message: "Senha editada com sucesso!" };
    } catch (error) {
     
      return {
        status: "error",
        message:
          "Ops! algo deu errado, verifique sua conexão e tente novamente.",
      };
    }
  }

  async deleteUser(userId) {
    try {
      const { data } = await api.delete(`/user/${userId}`);
      toast.success("Usuário Excluído com sucesso!");
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
