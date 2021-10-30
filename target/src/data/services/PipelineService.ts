import React from "react";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";
class PipelineService {
  async getPiplines(): Promise<pipeline[]> {
    try {
      const { data } = await api.get("/pipeline");

      return data;
    } catch (error) {
      return error;
    }
  }

  async getPipline(id: string): Promise<pipeline> {
    try {
      const { data } = await api.get(`/pipeline/${id}`);

      return data;
    } catch (error) {
      return error;
    }
  }

  async createPipeline(name: string): Promise<object> {
    const body: object = { name };

    try {
      const response = await api.post("/pipeline/", body);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async updatePipeline(id: string, name: string): Promise<object> {
    const body: object = { name };

    try {
      const response = await api.put(`/pipeline/${id}`, body);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async deletePipeline(id: string): Promise<object> {
    try {
      const response = await api.delete(`/pipeline/${id}`);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async createDeal(data: DealTypes): Promise<object> {
    try {
      const response = await api.post("/deal/", data);

      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new PipelineService();
