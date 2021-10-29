import React from "react";
import { toast } from "react-toastify";
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
      const response = await api.post("/cofWmpany", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@taget:token")}`,
        },
      });
      toast.success("Empresa Criada com sucesso!");
      return response;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
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
      toast.success("Empresa editada com sucesso!");
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
