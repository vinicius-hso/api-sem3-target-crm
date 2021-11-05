import React, { useState, useContext, useEffect } from "react";
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
import { Button, CircularProgress } from "@material-ui/core";
import CreateCompanyModal from "ui/components/Modal/CreateCompanyModal";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import CompanyDetailModal from "ui/components/Modal/CompanyDetailModal";
import DeleteCompanyModal from "ui/components/Modal/Company/DeleteCompanyModal";
import { CompanyTypes } from "types/Company";

function CompanyPage() {
  const {
    companies,
    filteredCompany,
    removeFiltered,
    getData,
    hasError,
    isLoading,
  } = useCompanyPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  //MODAL CONTROL
  const [openCreateCompanyModal, setOpenCreateCompanyModal] =
    React.useState(false);
  const [openDetailCompanyModal, setOpenDetailCompanyModal] =
    React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState(
    {} as CompanyTypes
  );
  const [time, setTime] = React.useState(null);

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

  useEffect(() => {
    if (openCreateCompanyModal) {
      setTimeout(() => {
        getData();
      }, 5000);
    }
  }, [openCreateCompanyModal]);

  const removeFilters = () => {
    removeFiltered(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <CompanyPageContainer>
      <DeleteCompanyModal id={selectedCompany.id} />
      <CreateCompanyModal
        open={openCreateCompanyModal}
        setOpen={setOpenCreateCompanyModal}
      />
      <CompanyDetailModal
        open={openDetailCompanyModal}
        setOpen={setOpenDetailCompanyModal}
        company={selectedCompany}
      />
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
          onClick={() => setOpenCreateCompanyModal(true)}
          type="submit"
        >
          <i className="fa fa-plus" style={{ marginRight: "2px" }}></i> Nova
          empresa
        </Button>
      </NewCompanyButtonContainer>

      <CardsContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                name={company.name}
                city={company.city}
                state={company.state}
                email={company.site}
                picture={company.picture}
                onClick={() => {
                  setSelectedCompany(company);
                  setOpenDetailCompanyModal(true);
                }}
              />
            ))}
          </>
        )}
      </CardsContainer>
    </CompanyPageContainer>
  );
}

export default CompanyPage;
