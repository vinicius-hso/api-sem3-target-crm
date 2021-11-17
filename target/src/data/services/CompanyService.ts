import { toast } from "react-toastify";
import { CompanyTypes } from "types/Company";
import { serviceApi as api } from "./ServiceApi";

interface IResponse {
  status: string;
  message: string;
  titulo: string;
}

class CompanyService {
  async getCompanies(): Promise<CompanyTypes[]> {
    try {
      const { data } = await api.get("/company");

      return data;
    } catch (error) {
      return error;
    }
  }

  async getCompanyById(id: string): Promise<CompanyTypes> {
    try {
      const { data } = await api.get(`/company/${id}`);

      return data;
    } catch (error) {
      return error;
    }
  }

  async createCompany(data: CompanyTypes): Promise<string> {
    try {
      const response = await api.post("/company", data);
      toast.success("Empresa Criada com sucesso!");
      return response.data.id;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async editCompany(companyId: string, company): Promise<IResponse> {
    try {
      await api.put(`/company/${companyId}`);
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

  async deleteCompany(companyId: string): Promise<string> {
    try {
      await api.delete(`/company/${companyId}`);
      toast.success("Empresa deletada com sucesso!");
      return "success";
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }
}

export default new CompanyService();
