import React, { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";
import { CompanyTypes } from "types/Company";

export const useCompanyPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [companies, setCompanies] = useState([]);
  const [formatCompaniesToSelect, setFormat] = useState([]);
  const [createCompanyModalState, setCreateCompanyModalState] =
    useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const formatListToSelect = (companies: any[]): any => {
    setFormat(
      companies.map((company) => {
        return { value: company.id, label: company.name };
      })
    );
  };

  const getData = async () => {
    const response = await CompanyService.getCompanies();
    setCompanies(response);
    formatListToSelect(response);
  };

  const filteredCompany = async (terms: string, typeValue: string) => {
    if (!localStorage.getItem("companiesFilter")) {
      localStorage.setItem("companiesFilter", JSON.stringify(companies));
    }
    if (typeValue === "name")
      setCompanies(
        companies.filter((company) =>
          company.name.toLowerCase().includes(terms.toLocaleLowerCase())
        )
      );
    else
      setCompanies(
        companies.filter((company) =>
          company?.city.toLowerCase().includes(terms.toLocaleLowerCase())
        )
      );
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    setCompanies(JSON.parse(localStorage.getItem("dealsListFilter")));
    if (!isNewSearched) {
      localStorage.removeItem("dealsListFilter");
    }
  };

  const createCompany = async (data: CompanyTypes) => {
    await CompanyService.createCompany(data);
    useCreateCompanyModal();
  };

  const useCreateCompanyModal = () => {
    setCreateCompanyModalState(!createCompanyModalState);
  };

  return {
    companies,
    formatCompaniesToSelect,
    filteredCompany,
    removeFiltered,

    // CREATE MODAL
    createCompany,
    useCreateCompanyModal,
    createCompanyModalState,
    setCreateCompanyModalState,
  };
};
