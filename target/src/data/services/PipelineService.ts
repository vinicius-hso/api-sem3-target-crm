import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";
import { toast } from "react-toastify";

class PipelineService {
  async getPiplines(): Promise<pipeline[]> {
    try {
      const { data } = await api.get("/pipeline");

      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async getPipline(id: string): Promise<pipeline> {
    try {
      const { data } = await api.get(`/pipeline/${id}`);

      return data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async createPipeline(name: string): Promise<object> {
    const body: object = { name };

    try {
      const response = await api.post("/pipeline/", body);

      toast.success("Pipeline criado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async updatePipeline(id: string, name: string): Promise<object> {
    const body: object = { name };

    try {
      const response = await api.put(`/pipeline/${id}`, body);

      toast.success("Pipeline alterado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async deletePipeline(id: string): Promise<object> {
    try {
      const response = await api.delete(`/pipeline/${id}`);

      toast.success("Pipeline deletado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }

  async createDeal(data: DealTypes): Promise<object> {
    try {
      const response = await api.post("/deal/", data);

      toast.success("Deal criado com sucesso!");
      return response.data;
    } catch (error) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
      return error;
    }
  }
}

export default new PipelineService();
