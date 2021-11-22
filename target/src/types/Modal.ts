import { DealTypes } from "./Deal";
import { CompanyTypes } from "./Company";

export default interface ModalTypes {
  createModalState: boolean;
  UseCreateModal: () => void;
  createPipeline: () => Promise<void>;

  updateModalState: boolean;
  UseUpdateModal: (id: string) => void;
  updatePipeline: (name: string) => Promise<void>;

  deleteModalState: boolean;
  UseDeleteModal: (id: string) => void;
  deletePipeline: () => Promise<void>;

  createDealModalState: boolean;
  UseCreateDealModal: (pipelineId?: string) => void;
  createDeal: (data: DealTypes) => Promise<void>;

  dealDetailModalState: boolean;
  UseDealDetailModal: (deal: any) => void;

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
