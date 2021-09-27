import React from "react";
import {
  CardsContainer,
  CompanyHeaderContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import CompanyCard from "ui/components/CompanyCard/CompanyCard";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import { ContactsHeaderContainer, ContactsPageContainer } from "@styles/pagesStyle/contacts.style";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import ContactCard from "ui/components/ContactCard/ContactCard";

function Contacts() {
  const { companies, filteredCompany, removeFiltered } = useCompanyPage();
  const [valueType, setValueType] = React.useState("name");
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
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

  const removeFilters = () => {
    removeFiltered(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <ContactsPageContainer>
      <ContactsHeaderContainer>
        <TitleContainer>
          <Title title="Contatos"></Title>
        </TitleContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "city", name: "Cidade" },
            { value: "company", name: "Empresa" },
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
      </ContactsHeaderContainer>
      <CardsContainer>
        {companies.map(() => (
          <ContactCard
            
                name={Contacts.name} rating={0}            
          />
        ))}
      </CardsContainer>
    </ContactsPageContainer>
  );
}

export default Contacts;


