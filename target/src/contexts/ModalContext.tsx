import React, { useState, createContext } from "react";
import ModalTypes from "types/Modal";

const ModalContext = createContext<ModalTypes>({} as ModalTypes);

export const ModalProvider: React.FC = ({ children }) => {
  const [createModalState, setCreateModalState] = useState<boolean>(false);
  const [updateModalState, setUpdateModalState] = useState<boolean>(false);
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false);

  const useCreateModal = () => {
    setCreateModalState(!createModalState);
  };

  const useUpdateModal = () => {
    setUpdateModalState(!updateModalState);
  };

  const useDeleteModal = () => {
    setDeleteModalState(!deleteModalState);
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
