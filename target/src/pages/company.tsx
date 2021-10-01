import React, { useState, useContext } from "react";
import {
  CardsContainer,
  CompanyHeaderContainer,
  CompanyPageContainer,
  NewCompanyButtonContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import CompanyCard from "ui/components/CompanyCard/CompanyCard";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import { useCompanyPage } from "data/services/hooks/PageHooks/companyHook";
import { Button } from "@material-ui/core";
import CreateCompanyModal from "ui/components/Modal/CreateCompanyModal";
import PipelineContext from "contexts/PipelineContext";

function CompanyPage() {
  const { companies, filteredCompany, removeFiltered } = useCompanyPage();
  const [valueType, setValueType] = React.useState("name");
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [time, setTime] = React.useState(null);

  const { useCreateCompanyModal } = useContext(PipelineContext);
  // const { useCreateCompanyModal } = useContext(CompanyContext);
  // const { useCreateCompanyModal } = useCompanyPage();

  const handleChangeSearchTerm = (event) => {
    if (hasFiltered) {
      removeFiltered(true);
    }
    setSearchTerm(event.target.value);
    if (time) {
      clearTimeout(time);
      setTime(null);
    }
    setTime(
      setTimeout(() => {
        filteredCompany(event.target.value, valueType);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    removeFiltered(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <CompanyPageContainer>
      <CreateCompanyModal />
      <CompanyHeaderContainer>
        <TitleContainer>
          <Title title="EMPRESAS"></Title>
        </TitleContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "city", name: "Cidade" },
          ]}
          ChangeType={(event) => {
            setValueType(event.target.value);
          }}
          onChange={(event) => {
            handleChangeSearchTerm(event);
          }}
          value={searchTerm}
          onClick={removeFilters}
          hasFiltered={hasFiltered}
        />
      </CompanyHeaderContainer>
      <NewCompanyButtonContainer>
        <Button
          variant="contained"
          sx={{ width: "auto", height: "30px" }}
          color="primary"
          onClick={() => useCreateCompanyModal()}
          type="submit"
        >
          <i className="fa fa-plus" style={{ marginRight: "2px" }}></i> Nova
          empresa
        </Button>
      </NewCompanyButtonContainer>

      <CardsContainer>
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            name={company.name}
            city={company.city}
            state={company.state}
            email={company.site}
            picture={company.picture}
          />
        ))}
      </CardsContainer>
    </CompanyPageContainer>
  );
}

export default CompanyPage;
