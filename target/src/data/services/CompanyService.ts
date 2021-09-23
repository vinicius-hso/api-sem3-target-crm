import React from "react";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
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
}

export default new CompanyService();
