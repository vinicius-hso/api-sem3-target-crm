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
import UserCard from "ui/components/UserCard/UserCard";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";

function UserPage() {
  const { users } = useUserPage();
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
          <Title title="Gerenciamento de Usuarios"></Title>
        </TitleContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "role", name: "Role" },
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
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
            picture={user.picture}
          />
        ))}
      </CardsContainer>
    </ContactsPageContainer>
  );
}

export default UserPage;
