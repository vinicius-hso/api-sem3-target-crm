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
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";

function ContactPage() {
  const { contacts } = useContactPage();
  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [time, setTime] = React.useState(null);

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
        //filteredCompany(event.target.value, valueType);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    //removeFiltered(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <ContactsPageContainer>
      <ContactsHeaderContainer>
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
          value={searchTerm}
          onClick={removeFilters}
          hasFiltered={hasFiltered}
        />
      </ContactsHeaderContainer>
      <CardsContainer>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            city={contact.city}
            company={contact.company.name}
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
