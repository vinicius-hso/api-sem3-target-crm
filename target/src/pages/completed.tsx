import React, { useEffect, useState } from "react";
import {
  CardsContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import {
  CompletedButtonsContainer,
  CompletedHeaderContainer,
  CompletedPageContainer,
} from "@styles/pagesStyle/completed.style";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { useCompletedPage } from "data/services/hooks/PageHooks/CompletedHook";
import DealCompletedCard from "ui/components/DealCompletedCard/DealCompletedCard";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { DealTypes } from "types/Deal";
import AchivedDealModal from "ui/components/Modal/Completed/ArchivedModal";
import Title from "ui/components/Title/Title";
import { StatusTypes } from "types/Status";
import Alert from "ui/components/AlertComponent/AlertComponent";

function CompletedPage() {
  const { deals, filterDeals, removefilterDeals } = useCompletedPage();
  const [valueType, setValueType] = useState("name");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [time, setTime] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = useState("WON");
  const [selectListValues, setSelectListValues] = useState([]);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatContactToSelect } = useContactPage();
  const [openAchivedModal, setOpenAchivedModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<DealTypes>({});
  const [status, setStatus] = useState<StatusTypes>({});

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
    setSelectedDeal(deal);
    setOpenAchivedModal(true);
  };

  useEffect(() => {
    if (status.type) {
      const i = deals.indexOf(selectedDeal);
      deals.splice(i, 1);
      setTimeout(() => {
        setStatus({});
      }, 3000);
    }
  }, [status]);
  return (
    <CompletedPageContainer>
      {status.type ? (
        <Alert
          severity={status.type}
          message={status.message}
          title={status.title}
        />
      ) : null}

      <AchivedDealModal
        open={openAchivedModal}
        setOpen={setOpenAchivedModal}
        deal={selectedDeal}
        setStatus={setStatus}
      />
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
