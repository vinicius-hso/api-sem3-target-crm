import React, { useState, createContext } from "react";
import ModalTypes from "types/Modal";

const ModalContext = createContext<ModalTypes>({} as ModalTypes);

export const ModalProvider: React.FC = ({ children }) => {
  const [updateModalState, setUpdateModalState] = useState<boolean>(false);
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false);

  const useUpdateModal = () => {
    setUpdateModalState(!updateModalState);
  };

  const useDeleteModal = () => {
    setDeleteModalState(!deleteModalState);
  };

  return (
    <ModalContext.Provider
      value={{
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
