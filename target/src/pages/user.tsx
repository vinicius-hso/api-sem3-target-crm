import React from "react";
import {
  CardsContainer,
  UserHeaderContainer,
  UserPageContainer,
  NewUserButtonContainer,
  TitleContainer,
} from "@styles/pagesStyle/user.style";
import UserCard from "ui/components/UserCard/UserCard";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import { Button } from "@material-ui/core";
import CreateUserModal from "ui/components/Modal/CreateUserModal";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";
import UserDetailModal from "ui/components/Modal/UserDetailModal";
import { mockRoles } from "data/utils/mock";

function UserPage() {
  const { users, filteredUser, removeFiltered } = useUserPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [openCreateUserModal, setOpenCreateUserModal] = React.useState(false);
  const [openDetailUserModal, setOpenDetailUserModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({});

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
        filteredUser(event.target.value, valueType);
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
    <UserPageContainer>
      <CreateUserModal
        open={openCreateUserModal}
        setOpen={setOpenCreateUserModal}
      />
      <UserDetailModal
        open={openDetailUserModal}
        setOpen={setOpenDetailUserModal}
        user={selectedUser}
      />

      <UserHeaderContainer>
        <TitleContainer>
          <Title title="Gerenciamento de Usuários"></Title>
        </TitleContainer>

        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          selectListValues={mockRoles}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "role", name: "Perfil" },
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
      </UserHeaderContainer>
      <NewUserButtonContainer>
        <Button
          variant="contained"
          sx={{ width: "auto", height: "30px" }}
          color="primary"
          onClick={() => setOpenCreateUserModal(true)}
          type="submit"
        >
          <i className="fa fa-plus" style={{ marginRight: "2px" }}></i> Novo
          usuário
        </Button>
      </NewUserButtonContainer>

      <CardsContainer>
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
            picture={user.picture}
            onClick={() => {
              setSelectedUser(user);
              setOpenDetailUserModal(true);
            }}
          />
        ))}
      </CardsContainer>
    </UserPageContainer>
  );
}

export default UserPage;
