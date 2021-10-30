import React from "react";
import { pipe } from "rxjs";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";

class DealsService {
  async getAllDeals() {
    try {
      const { data } = await api.get("/deal");

      return data;
    } catch (error) {
      return error;
    }
  }

  async getDeals() {
    try {
      const { data } = await api.get(
        "/deal?status=INPROGRESS&with=pipeline,company,contact"
      );

      return data;
    } catch (error) {
      return error;
    }
  }

  async getDealsCompleted() {
    try {
      const { data } = await api.get("/deal?status=ARCHIVED");
      return data;
    } catch (error) {
      return error;
    }
  }

  async editDeal(dealId, deal) {
    try {
      const { data } = await api.put(`/deal/${dealId}`, deal);

      return data;
    } catch (error) {
      return error;
    }
  }

  async createActivity(dealId, activity) {
    try {
      const { data } = await api.post(`deal/${dealId}/activity`, activity);

      return data;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(dealId, newStatus) {
    try {
      const { data } = await api.put(`deal/${dealId}`, newStatus);

      return data;
    } catch (error) {
      return error;
    }
  }

  async updateStatusAndRestore(
    dealId: string,
    pipeline: string,
    status: string
  ) {
    try {
      await api.put(`deal/${dealId}`, { pipeline, status });
      return {
        type: "success",
        message: "Empresa editada com sucesso!",
        title: "Sucesso",
      };
    } catch (error) {
      return {
        type: "error",
        message:
          "Ops! algo deu errado, verifique sua conexão e tente novamente.",
        title: "Erro",
      };
    }
  }

  async dealPipelineUpdate(pipeline: string, dealId: string) {
    try {
      const { data } = await api.put(`/deal/${dealId}/pipelineUpdate`, {
        pipeline,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new DealsService();
