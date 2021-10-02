import React, { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";
import { CompanyTypes } from "types/Company";

export const useCompanyPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [companies, setCompanies] = useState([]);
  const [formatCompaniesToSelect, setFormat] = useState([]);
  const [createCompanyModalState, setCreateCompanyModalState] =
    useState<boolean>(false);

  const [companyDetailModalState, setCompanyDetailModalState] =
    useState<boolean>(false);
  const [companyDetail, setCompanyDetail] = useState<CompanyTypes>({});

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
    const teste = await JSON.parse(localStorage.getItem("dealsListFilter"));
    setCompanies(teste);
    if (!isNewSearched) {
      localStorage.removeItem("dealsListFilter");
    }
  };

  const createCompany = async (data: CompanyTypes) => {
    await CompanyService.createCompany(data);
    useCreateCompanyModal();
  };

  const useCreateCompanyModal = () => {
    console.log("Function -> useCreateCompanyModal");
    setCreateCompanyModalState(!createCompanyModalState);
  };

  const useCompanyDetailModal = (companyDetail: any) => {
    // console.log('Oi!')
    console.log(companyDetail);
    setCompanyDetail(companyDetail);
    setCompanyDetailModalState(!companyDetailModalState);
  };

  const editCompany = async (companyId: any, data: any) => {
    const response = await CompanyService.editCompany(companyId, data);
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
    setCompanyDetailModalState,
    useCompanyDetailModal,
    companyDetailModalState,
    editCompany,
    companyDetail,
  };
};
