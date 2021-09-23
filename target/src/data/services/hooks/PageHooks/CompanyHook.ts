import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/serviceApi";
import CompanyService from "data/services/CompanyService";

export const useCompanyPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await CompanyService.getCompanies();
    setCompanies(response);
  };
  return {
    companies,
  };
};
