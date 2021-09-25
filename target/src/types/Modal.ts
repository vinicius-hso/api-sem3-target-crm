import { DealTypes } from "./Deal";

export default interface ModalTypes {
  createModalState: boolean;
  createDealModalState: boolean;
  useCreateModal: () => void;
  useCreateDealModal: () => void;
  dealDetailModalState: boolean;
  useDealDetailModal: (deal: any) => void;
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
  pipeline: pipeline;
  dealsList: any[];
  dealTotalParams: any;
  onDragEnd: (any) => void;
  removefilterDeals: (boolean) => void;
  filterDeals: (value: string, type: string) => void;
}

export interface pipeline {
  totalColumnValue: number;
  id: string;
  name: string;
  pipeBudgetSum: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  deals?: any[];
}
