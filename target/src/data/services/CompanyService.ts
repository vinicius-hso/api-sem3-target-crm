import React from "react";
import { CompanyTypes } from "types/Company";
import { serviceApi as api } from "./serviceApi";

class CompanyService {
  private headers: object;
  async getCompanies() {
    try {
      const { data } = await api.get("/company", {
        headers: this.headers,
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async createCompany(data: CompanyTypes) {
    try {
      const response = await api.post("/company", data, {
        headers: this.headers,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
}



export default new CompanyService();
