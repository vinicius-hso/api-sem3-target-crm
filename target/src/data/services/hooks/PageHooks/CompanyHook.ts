import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/serviceApi";
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
  return {
    companies,
    formatCompaniesToSelect,
  };
};
