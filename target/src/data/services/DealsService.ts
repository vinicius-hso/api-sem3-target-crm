import React from "react";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./serviceApi";

class DealsService {
  private headers: object;

  async getDeals() {
    try {
      const { data } = await api.get("/deal", {
        headers: this.headers,
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new DealsService();
