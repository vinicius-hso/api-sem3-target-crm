/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from "react";
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
import CreateContactModal from "ui/components/Modal/Contact/CreateContactModal";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import UpdateContactModal from "ui/components/Modal/Contact/UpdateContactModal";
import DeleteContactModal from "ui/components/Modal/Contact/DeleteContactModal";
import ImportContactModal from "ui/components/Modal/Contact/ImportContactModal";
import ContactContext from "contexts/ContactContext";

function ContactPage() {
  const { filteredContact, removeFiltered } = useContactPage();
  const { formatCompaniesToSelect, filteredCompany } = useCompanyPage();
  const [valueType, setValueType] = useState("name");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [time, setTime] = useState(null);
  const [selectedId, setSelectedId] = useState<string>("");

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

  const {
    useImportContactModal,
    useCreateContactModal,
    useUpdateContactModal,
    contacts,
    isLoading,
    hasError,
  } = useContext(ContactContext);

  const setId = () => {
    setSelectedId("");
  };

  return (
    <ContactsPageContainer>
      <CreateContactModal />
      <ImportContactModal companies={formatCompaniesToSelect} />
      {selectedId ? <UpdateContactModal setId={setId} id={selectedId} /> : null}
      <DeleteContactModal id={selectedId} />
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
          selectListValues={formatCompaniesToSelect}
          value={searchTerm}
          onClick={removeFilters}
          hasFiltered={hasFiltered}
        />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Tooltip
            title="Importar contatos"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => useImportContactModal()}
            >
              Importar
            </Button>
          </Tooltip>

          <Tooltip
            title="Adicionar contato"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="success"
              style={{ color: "white", marginLeft: "10px" }}
              onClick={() => useCreateContactModal()}
            >
              Adicionar
            </Button>
          </Tooltip>
        </div>
      </ContactsHeaderContainer>
      <br />
      <CardsContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {contacts?.map((contact) => (
              <ContactCard
                key={contact.id}
                name={contact.name}
                city={contact.city}
                company={contact.company?.name}
                phone={contact.phone}
                state={contact.state}
                picture={contact.picture}
                onClick={() => {
                  useUpdateContactModal(), setSelectedId(contact.id);
                }}
              />
            ))}
          </>
        )}
      </CardsContainer>
    </ContactsPageContainer>
  );
}

export default ContactPage;
