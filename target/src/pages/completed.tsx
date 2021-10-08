import React, { useState, useContext } from "react";
import {
  CardsContainer,
  CompanyHeaderContainer,
  NewCompanyButtonContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import CompanyCard from "ui/components/CompanyCard/CompanyCard";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import CreateCompanyModal from "ui/components/Modal/CreateCompanyModal";
import PipelineContext from "contexts/PipelineContext";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import CompanyDetailModal from "ui/components/Modal/CompanyDetailModal";
import {
  CompletedButtonsContainer,
  CompletedHeaderContainer,
  CompletedPageContainer,
} from "@styles/pagesStyle/completed.style";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { useDealPage } from "data/services/hooks/PageHooks/DealHook";
import { useCompletedPage } from "data/services/hooks/PageHooks/CompletedHook";
import DealCard from "ui/components/DealComponents/DealCard/DealCard";
import DealCompletedCard from "ui/components/DealCompletedCard/DealCompletedCard";

function CompletedPage() {
  const [value, setValue] = React.useState("WON");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
  };
  const handleClick = (deal) => {
    console.log(deal);
  };

  const { deals } = useCompletedPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  //MODAL CONTROL
  const [openCreateCompanyModal, setOpenCreateCompanyModal] =
    React.useState(false);
  const [openDetailCompanyModal, setOpenDetailCompanyModal] =
    React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState({});
  const [time, setTime] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = React.useState("WON");

  const handleChangeSearchTerm = (event) => {
    if (hasFiltered) {
      //removeFiltered(true);
    }
    setSearchTerm(event.target.value);
    if (time) {
      clearTimeout(time);
      setTime(null);
    }
    setTime(
      setTimeout(() => {
        // filteredCompany(event.target.value, valueType);
        // setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    // removeFiltered(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <CompletedPageContainer>
      <CompletedHeaderContainer>
        <TitleContainer>
          <Title title="NEGOCIAÇÕES FINALIZADAS"></Title>
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
      </CompletedHeaderContainer>
      <CompletedButtonsContainer>
        <BottomNavigation value={selectedStatus} onChange={handleChange}>
          <BottomNavigationAction
            label="Ganhou"
            value="WON"
            icon={<i className="fa fa-thumbs-o-up"></i>}
          />
          <BottomNavigationAction
            label="Perdeu"
            value="LOST"
            icon={<i className="fa fa-thumbs-o-down"></i>}
          />
          <BottomNavigationAction
            label="Arquivadas"
            value="ARCHIVED"
            icon={<i className="fa fa-archive"></i>}
          />
        </BottomNavigation>
      </CompletedButtonsContainer>
      <CardsContainer>
        {deals
          .filter((deal) => deal.status === selectedStatus)
          .map((deal) => (
            <DealCompletedCard
              key={deal.id}
              title={deal.name}
              companyName={deal.company?.name}
              contactName={deal.contact?.name}
              companyPicture={deal.company?.picture}
              budget={deal.value}
              startDate={deal.createdAt}
              status={deal.status}
              style={{
                cursor: deal.status === "ARCHIVED" ? "pointer" : "",
              }}
              onClick={() => {
                deal.status === "ARCHIVED" ? handleClick(deal) : null;
              }}
            />
          ))}
      </CardsContainer>
    </CompletedPageContainer>
  );
}

export default CompletedPage;
