import React from "react";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";
class PipelineService {
  private headers: object;

  async getPiplines(): Promise<pipeline[]> {
    try {
      const { data } = await api.get("/pipeline", {
        headers: this.headers,
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getPipline(id: string): Promise<pipeline> {
    try {
      const { data } = await api.get(`/pipeline/${id}`, {
        headers: this.headers,
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async createPipeline(name: string): Promise<object> {
    const body: object = { name };

    try {
      const response = await api.post("/pipeline/", body, {
        headers: this.headers,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async updatePipeline(id: string, name: string): Promise<object> {
    const body: object = { name };

    try {
      const response = await api.put(`/pipeline/${id}`, body, {
        headers: this.headers,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async deletePipeline(id: string): Promise<object> {
    try {
      const response = await api.delete(`/pipeline/${id}`, {
        headers: this.headers,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async createDeal(data: DealTypes): Promise<object> {
    try {
      const response = await api.post("/deal/", data, {
        headers: this.headers,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }

  constructor() {
    /*const token = localStorage.getItem("@target:token");
    this.headers = {
      Authorization: `Bearer ${token}`,
    };*/
  }
}

export default new PipelineService();
