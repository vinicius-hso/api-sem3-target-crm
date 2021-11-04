import { DealTypes } from "./Deal";
import { CompanyTypes } from "./Company";

export default interface ModalTypes {
  createModalState: boolean;
  useCreateModal: () => void;
  createPipeline: () => void;

  updateModalState: boolean;
  useUpdateModal: (id: string) => void;
  updatePipeline: () => void;

  deleteModalState: boolean;
  useDeleteModal: (id: string) => void;
  deletePipeline: () => void;

  createDealModalState: boolean;
  useCreateDealModal: (pipelineId?: string) => void;
  createDeal: (data: DealTypes) => void;

  dealDetailModalState: boolean;
  useDealDetailModal: (deal: any) => void;

  // CREATE COMPANY MODAL
  // createCompanyModalState: boolean;
  // useCreateCompanyModal: () => void;
  // createCompany: (data: CompanyTypes) => void;

  // COMPANY DETAILS MODAL
  // companyDetailModalState: boolean;
  // useCompanyDetailModal: (company: any) => void;
  // useUpdateCompanyModal: (company: any) => void;

  // companyDetail: any;
  // company: CompanyTypes;

  // EDIT COMPANY
  // editCompany: (id: any, data: CompanyTypes) => void;

  setName: (name: string) => void;
  getPipelines: () => void;
  pipelines: pipeline[];
  pipeline: pipeline;
  dealsList: any[];
  dealDetail: any;
  selectedPipeline: string;
  setSelectedPipeline: any;
  dealTotalParams: any;
  onDragEnd: (any) => void;
  removefilterDeals: (boolean) => void;
  filterDeals: (value: string, type: string, resetFilter: boolean) => void;
  isLoading: boolean;
  hasError: string;
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
