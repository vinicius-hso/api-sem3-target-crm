import React, { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";

export const useCompanyPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [companies, setCompanies] = useState([]);
  const [formatCompaniesToSelect, setFormat] = useState([]);

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

  return {
    companies,
    formatCompaniesToSelect,
    filteredCompany,
    removeFiltered,
  };
};
