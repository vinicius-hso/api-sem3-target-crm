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
    const resp = {};
    try {
      await api.put(`/company/${companyId}`, company, {
        headers: this.headers,
      }).then((response) => {
          resp['data'] = response.data;
          resp['status'] = response.status;
          resp['statusText'] = response.statusText;
          resp['headers'] = response.headers;
          resp['config'] = response.config;
      });
      return resp;
    } catch (error) {
      
      return [error, resp];
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
