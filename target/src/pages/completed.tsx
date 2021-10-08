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
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";

function CompletedPage() {
  const { deals, filterDeals, removefilterDeals } = useCompletedPage();
  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [time, setTime] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = React.useState("WON");
  const [selectListValues, setSelectListValues] = React.useState([]);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatContactToSelect } = useContactPage();

  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "company") {
      setSelectListValues(formatCompaniesToSelect);
    } else if (event.target.value === "contact") {
      setSelectListValues(formatContactToSelect);
    } else {
      setSelectListValues([]);
    }
  };

  const handleChangeSearchTerm = (event) => {
    let resetFilter = false;
    if (hasFiltered) {
      resetFilter = true;
    }
    setSearchTerm(event.target.value);
    if (time) {
      clearTimeout(time);
      setTime(null);
    }
    setTime(
      setTimeout(() => {
        filterDeals(event.target.value, valueType, resetFilter);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    removefilterDeals();
    setHasFiltered(false);
    setSearchTerm("");
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
  };
  const handleClick = (deal) => {
    console.log(deal);
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
          value={searchTerm}
          selectListValues={selectListValues}
          hasFiltered={hasFiltered}
          onClick={removeFilters}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "company", name: "Empresa" },
            { value: "contact", name: "Contato" },
          ]}
          ChangeType={(event) => {
            handleChangeValueType(event);
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handleChangeSearchTerm(event);
          }}
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
