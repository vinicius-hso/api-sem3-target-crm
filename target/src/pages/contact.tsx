import React from "react";
import {
  CardsContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import {
  ContactsHeaderContainer,
  ContactsPageContainer,
} from "@styles/pagesStyle/contacts.style";
import ContactCard from "ui/components/ContactCard/ContactCard";
import { useContactPage } from "data/services/hooks/PageHooks/contactHook";
import CreateContactModal from "ui/components/Modal/CreateContactModal";
import { useCompanyPage } from "data/services/hooks/PageHooks/companyHook";

function ContactPage() {
  const { contacts, filteredContact, removeFiltered } = useContactPage();
  const { formatCompaniesToSelect, filteredCompany } = useCompanyPage();
  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [time, setTime] = React.useState(null);

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
        filteredContact(event.target.value, valueType, resetFilter);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    removeFiltered();
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <ContactsPageContainer>
      <ContactsHeaderContainer>
        <CreateContactModal />
        <TitleContainer>
          <Title title="CONTATOS"></Title>
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
          selectListValues={formatCompaniesToSelect}
          value={searchTerm}
          onClick={removeFilters}
          hasFiltered={hasFiltered}
        />
      </ContactsHeaderContainer>
      <br />
      <CardsContainer>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            city={contact.city}
            company={contact.company?.name}
            phone={contact.phone}
            state={contact.state}
            picture={contact.picture}
          />
        ))}
      </CardsContainer>
    </ContactsPageContainer>
  );
}

export default ContactPage;
