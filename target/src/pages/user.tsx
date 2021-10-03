import React from "react";
import {
  CardsContainer,
  TitleContainer,
  NewCompanyButtonContainer,
} from "@styles/pagesStyle/company.style";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import {
  ContactsHeaderContainer,
  ContactsPageContainer,
} from "@styles/pagesStyle/contacts.style";
import { Button } from "@material-ui/core";
import UserCard from "ui/components/UserCard/UserCard";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";

import CreateUserModal from "ui/components/Modal/CreateUserModal";
import CompanyDetailModal from "ui/components/Modal/CompanyDetailModal";


function UserPage() {
 

  const { users } = useUserPage();
  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [time, setTime] = React.useState(null);
  const [openCreateUserModal, setOpenCreateUserModal] =
    React.useState(false);
  const { openUserModalState, setOpenUserModalState } = useUserPage();
  const [selectedUser, setSelectedUser] = React.useState({});



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
      <TitleContainer>
          <Title title="Gerenciamento de Usuarios"></Title>
        </TitleContainer>

      <CreateUserModal open={openCreateUserModal} />
      <CompanyDetailModal
        open={openUserModalState}
        company={selectedUser}
      />
      <ContactsHeaderContainer>
      <NewCompanyButtonContainer>
        <Button
          variant="contained"
          sx={{ width: "auto", height: "30px" }}
          color="primary"
          onClick={() => setOpenCreateUserModal(true)}
          type="submit"
        >
          <i className="fa fa-plus" style={{ marginRight: "2px" }}></i> Novo
          usuario
        </Button>
      </NewCompanyButtonContainer>

        
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
