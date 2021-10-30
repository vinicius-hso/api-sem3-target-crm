import React from "react";
import { IUser } from "types/User";
import { serviceApi as api } from "./ServiceApi";

class UserService {
  async getUsers() {
    try {
      const { data } = await api.get("/user");

      return data;
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const { data } = await api.get(`/user/${id}`);

      return data;
    } catch (error) {
      return error;
    }
  }

  async createUser(data: IUser) {
    try {
      const response = await api.post("/user", data);

      return response.data;
    } catch (error) {
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

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new UserService();
