import React from "react";
import { CompanyTypes } from "types/Company";
import { serviceApi as api } from "./ServiceApi";

class CompanyService {
  private headers: object;
  async getCompanies(): Promise<CompanyTypes[]> {
    try {
      const { data } = await api.get("/company", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@taget:token")}`,
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getCompanyById(id: string): Promise<CompanyTypes> {
    try {
      const { data } = await api.get(`/company/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@taget:token")}`,
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async createCompany(data: CompanyTypes) {
    try {
      const response = await api.post("/company", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@taget:token")}`,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async editCompany(companyId, company) {
    try {
      await api.put(`/company/${companyId}`, company, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@taget:token")}`,
        },
      });
      return {
        status: "success",
        message: "Empresa editada com sucesso!",
        titulo: "Sucesso",
      };
    } catch (error) {
      return {
        status: "error",
        message:
          "Ops! algo deu errado, verifique sua conexão e tente novamente.",
        titulo: "Erro",
      };
    }
  }

  async deleteCompany(companyId) {
    try {
      const { data } = await api.delete(`/company/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@taget:token")}`,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new CompanyService();
