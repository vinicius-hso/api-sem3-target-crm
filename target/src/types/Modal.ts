import { DealTypes } from "./Deal";

export default interface ModalTypes {
  createModalState: boolean;
  createDealModalState: boolean;
  useCreateModal: () => void;
  useCreateDealModal: () => void;
  updateModalState: boolean;
  useUpdateModal: (id: string) => void;
  deleteModalState: boolean;
  useDeleteModal: (id: string) => void;
  deletePipeline: () => void;
  createPipeline: () => void;
  updatePipeline: () => void;
  setName: (name: string) => void;
  createDeal: (data: DealTypes) => void;
  getPipelines: () => void;
  pipelines: pipeline[];
}

export interface pipeline {
  id: string;
  name: string;
  pipeBudgetSum: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
