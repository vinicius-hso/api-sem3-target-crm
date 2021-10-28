import React, { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";
import { CompanyTypes } from "types/Company";

export const useCompanyPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [companies, setCompanies] = useState([]);
  const [removeFilteredCompanies, setFilteredCompanies] = useState([]);
  const [formatCompaniesToSelect, setFormat] = useState([]);
  const [createCompanyModalState, setCreateCompanyModalState] =
    useState<boolean>(false);
  const [companyDetail, setCompanyDetail] = useState<CompanyTypes>({});

  useEffect(() => {
    if (!companies.length) {
      getData();
    }
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
    setFilteredCompanies(response);
    formatListToSelect(response);
  };

  const filteredCompany = async (terms: string, typeValue: string) => {
    let filtered = [];
    if (typeValue === "name") {
      filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else {
      filtered = companies.filter((company) =>
        company?.city.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    }
    setCompanies(filtered);
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    if (!isNewSearched) setCompanies(removeFilteredCompanies);
  };

  const createCompany = async (data: CompanyTypes) => {
    await CompanyService.createCompany(data);
    useCreateCompanyModal();
  };

  const useCreateCompanyModal = () => {
    setCreateCompanyModalState(!createCompanyModalState);
  };

  const useCompanyDetailModal = (companyDetail: any) => {
    setCompanyDetail(companyDetail);
  };

  const editCompany = async (companyId: any, data: any) => {
    const res = await CompanyService.editCompany(companyId, data);
    return res;
  };

  const deleteCompany = async (companyId: any) => {
    const response = await CompanyService.deleteCompany(companyId);
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
    setCompanyDetail,
    useCompanyDetailModal,
    editCompany,
    companyDetail,
    deleteCompany,
  };
};