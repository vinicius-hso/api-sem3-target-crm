import { useEffect, useState } from "react";
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
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await CompanyService.getCompanies();
      setCompanies(response);
      setFilteredCompanies(response);
      formatListToSelect(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar as empresas, verifique sua conexão e tente novamente"
      );
    }
  };

  const filteredCompany = async (terms: string, typeValue: string) => {
    let filtered = [];
    if (typeValue === "name") {
      filtered = companies.filter((company: CompanyTypes) =>
        company.name.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else if (typeValue === "city") {
      filtered = companies.filter((company: CompanyTypes) =>
        company?.city.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else {
      filtered = companies.filter((company: CompanyTypes) =>
        company?.state.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    }

    setCompanies(filtered);
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    getData();
  };

  const createCompany = async (data: CompanyTypes) => {
    const result = await CompanyService.createCompany(data);
    return result;
  };

  const useCreateCompanyModal = () => {
    setCreateCompanyModalState(!createCompanyModalState);
  };

  const useCompanyDetailModal = (companyDetail: any) => {
    setCompanyDetail(companyDetail);
  };

  const editCompany = async (companyId: any, data: any) => {
    const result = await CompanyService.editCompany(companyId, data);
    return result;
  };

  const deleteCompany = async (companyId: any) => {
    const result = await CompanyService.deleteCompany(companyId);
    return result;
  };

  return {
    companies,
    setCompanies,
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
    getData,
    hasError,
    isLoading,
  };
};
