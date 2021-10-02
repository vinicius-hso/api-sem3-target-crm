import React from "react";
import { IUser } from "types/User";
import { serviceApi as api } from "./serviceApi";

class UserService {
  private headers: object;

  async getUsers() {
    try {
      const { data } = await api.get("/user", {
        headers: this.headers,
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async createUser({
    name,
    email,
    role,
    picture,
  }: IUser): Promise<string> {
    const body: IUser = {
      name,
      email,
      role,
      picture,
    };

    try {
      const { data } = await api.post("/user", body, {
        headers: this.headers,
      });

      return data.id;
    } catch (error) {
      return error;
    }
  }

  async updateUser({
    id,
    name,
    email,
    role,
    picture,
  }: IUser): Promise<string> {
    const body: IUser = {
      name,
      email,
      role,
      picture,
    };

    try {
      const { data } = await api.put(`/user/${id}`, body, {
        headers: this.headers,
      });

      return data.message;
    } catch (error) {
      return error.message;
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const { data } = await api.delete(`/user/${id}`, {
        headers: this.headers,
      });

      return data.message;
    } catch (error) {
      return error.message;
    }
  }
}

export default new UserService();
