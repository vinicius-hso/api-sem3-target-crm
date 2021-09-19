import PipelineService from "data/services/PipelineService";
import React, { useState, createContext, useEffect } from "react";
import { DealTypes } from "types/Deal";
import ModalTypes, { pipeline } from "types/Modal";

const PipelineContext = createContext<ModalTypes>({} as ModalTypes);

export const ModalProvider: React.FC = ({ children }) => {
  const [createModalState, setCreateModalState] = useState<boolean>(false);
  const [updateModalState, setUpdateModalState] = useState<boolean>(false);
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false);
  const [createDealModalState, setCreateDealModalState] = useState<boolean>(false);
  const [updateId, setUpdateIdState] = useState<string>();
  const [deleteId, setDeleteIdState] = useState<string>();
  const [name, setNameState] = useState<string>();
  const [pipelines, setPipelines] = useState<pipeline[]>();
  const [pipeline, setPipeline] = useState<pipeline>();
  const [deals, setDeals] = useState<DealTypes[]>();

  const useCreateModal = () => {
    setCreateModalState(!createModalState);
  };

  const useCreateDealModal = () => {
    setCreateDealModalState(!createDealModalState);
  };

  const useUpdateModal = (id: string) => {
    setUpdateIdState(id);
    if (id) getPipeline(id)
    setUpdateModalState(!updateModalState);
  };

  const useDeleteModal = (id: string) => {
    setDeleteIdState(id);
    setDeleteModalState(!deleteModalState);
  };

  const setName = (name: string) => {
    setNameState(name);
  };

  const deletePipeline = async () => {
    await PipelineService.deletePipeline(deleteId);
    useDeleteModal("");
    getPipelines()
  };

  const updatePipeline = async () => {
    await PipelineService.updatePipeline(updateId, name);
    useUpdateModal("");
    getPipelines()
  };

  const createPipeline = async () => {
    await PipelineService.createPipeline(name);
    useCreateModal();
    getPipelines()
  };

  const createDeal = async (data: DealTypes) => {
    await PipelineService.createDeal(data);
    useCreateDealModal();
  };

  const getPipelines = async () => {
    const data: pipeline[] = await PipelineService.getPiplines()

    const pipes = data.map(element => ({
      ...element,
      deals: []
    }
    ));
    setPipelines(pipes.sort(function(a,b) {
      return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
  }));
  }

  const getAllDeals = async () => {
    const data: DealTypes[] = await PipelineService.getDeals()

    const dealsList = data.map(element => ({
      ...element,
      deals: []
    }
    ));
    setDeals(dealsList)
  }

  const getPipeline = async (id: string) => {
    const data: pipeline = await PipelineService.getPipline(id)

    setPipeline(data)
  }

  useEffect(() => {
    getPipelines()
  }, [])


  return (
    <PipelineContext.Provider
      value={{
        createModalState,
        useCreateModal,
        updateModalState,
        useCreateDealModal,
        createDealModalState,
        useUpdateModal,
        deleteModalState,
        useDeleteModal,
        deletePipeline,
        updatePipeline,
        createPipeline,
        setName,
        createDeal,
        getPipelines,
        pipelines,
        pipeline,
        deals
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
};

export default PipelineContext;
