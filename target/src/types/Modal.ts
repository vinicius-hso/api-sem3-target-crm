import { DealTypes } from "./Deal";
import { CompanyTypes } from './Company';

export default interface ModalTypes {
  createModalState: boolean;
  createDealModalState: boolean;
  createCompanyModalState: boolean;

  dealDetailModalState: boolean;
  updateModalState: boolean;
  deleteModalState: boolean;

  useCreateModal: () => void;
  useCreateDealModal: () => void;  
  useDealDetailModal: (deal: any) => void;
  useUpdateModal: (id: string) => void;
  useDeleteModal: (id: string) => void;

  deletePipeline: () => void;
  createPipeline: () => void;
  updatePipeline: () => void;
  setName: (name: string) => void;
  
  getPipelines: () => void;
  pipelines: pipeline[];
  pipeline: pipeline;
  dealsList: any[];
  dealTotalParams: any;
  onDragEnd: (any) => void;
  removefilterDeals: (boolean) => void;
  filterDeals: (value: string, type: string) => void;
  
  createDeal: (data: DealTypes) => void;
  createCompany: (data: CompanyTypes) => void;
  useCreateCompanyModal: () => void;
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
