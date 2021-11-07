import React, { useState, createContext } from "react";
import { ICompanyContext } from "types/ICompanyContext";

const CompanyContext = createContext<ICompanyContext>({} as ICompanyContext);

export const CompanyProvider: React.FC = ({ children }) => {
  const [deleteCompanyModal, setDeleteCompanyModal] = useState<boolean>(false);

  function useDeleteCompanyModal() {
    setDeleteCompanyModal(!deleteCompanyModal);
  }

  return (
    <CompanyContext.Provider
      value={{
        useDeleteCompanyModal,
        deleteCompanyModal,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyContext;
