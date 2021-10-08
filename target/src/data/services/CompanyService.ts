import React from "react";
import { CompanyTypes } from "types/Company";
import { serviceApi as api } from "./ServiceApi";

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

  async getCompanyById(id: string): Promise<CompanyTypes> {
    try {
      const { data } = await api.get(`/company/${id}`, {
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

  async editCompany(companyId, company) {
    try {
      await api.put(`/company/${companyId}`, company, {
        headers: this.headers,
      });
      return { status: "success", message: "Empresa editada com sucesso!" };
    } catch (error) {
      return {
        status: "error",
        message:
          "Ops! algo deu errado, verifique sua conexão e tente novamente.",
      };
    }
  }

  async deleteCompany(companyId) {
    try {
      const { data } = await api.delete(`/company/${companyId}`, {
        headers: this.headers,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new CompanyService();
