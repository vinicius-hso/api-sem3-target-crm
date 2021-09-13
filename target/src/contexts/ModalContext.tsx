import PipelineService from "data/services/PipelineService";
import React, { useState, createContext } from "react";
import ModalTypes from "types/Modal";

const ModalContext = createContext<ModalTypes>({} as ModalTypes);

export const ModalProvider: React.FC = ({ children }) => {
  const [createModalState, setCreateModalState] = useState<boolean>(false);
  const [updateModalState, setUpdateModalState] = useState<boolean>(false);
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false);
  const [updateId, setUpdateIdState] = useState<string>();
  const [deleteId, setDeleteIdState] = useState<string>();
  const [name, setNameState] = useState<string>();

  const useCreateModal = () => {
    setCreateModalState(!createModalState);
  };

  const useUpdateModal = () => {
    setUpdateModalState(!updateModalState);
  };

  const useDeleteModal = () => {
    setDeleteModalState(!deleteModalState);
  };

  const setUpdateId = (id: string) => {
    setUpdateIdState(id);
  };

  const setName = (name: string) => {
    setNameState(name);
  };

  const setDeleteId = (id: string) => {
    setDeleteIdState(id);
  };

  const deletePipeline = async () => {
    const response = await PipelineService.deletePipeline(deleteId);
    useDeleteModal();
  };

  const updatePipeline = async () => {
    const response = await PipelineService.updatePipeline(updateId, name);
    useUpdateModal();
  };

  const createPipeline = async () => {
    const response = await PipelineService.createPipeline(name);
    useCreateModal();
  };


  return (
    <ModalContext.Provider
      value={{
        createModalState,
        useCreateModal,
        updateModalState,
        useUpdateModal,
        deleteModalState,
        useDeleteModal,
        deletePipeline,
        updatePipeline,
        createPipeline,
        setUpdateId,
        setName,
        setDeleteId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
