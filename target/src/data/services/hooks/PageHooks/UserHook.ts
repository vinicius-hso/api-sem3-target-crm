import React, { useEffect, useState } from "react";
import UserService from "data/services/UserService";
import { IUser } from "types/User";

// import CompanyService from "data/services/CompanyService";

export const useUserPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [users, setUsers] = useState([]);
  const [formatUserToSelect, setFormat] = useState([]);
  const [createUserModalState, setCreateUserModalState] =
    useState<boolean>(false);
  const [openUserModalState, setOpenUserModalState] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const formatListToSelect = (users: any[]): any => {
    setFormat(
      users.map((users) => {
        return { value: users.id, label: users.name };
      })
    );
  };

  const createUser = async (data: IUser) => {
    await UserService.createUser(data);
    useCreateUserModal();
  };

  const useCreateUserModal = () => {
    setCreateUserModalState(!createUserModalState);
  };

  const getData = async () => {
    const response = await UserService.getUsers();
    setUsers(response);
    formatListToSelect(response);
  };
  return {
    users,
    formatUserToSelect,
    createUser,
    useCreateUserModal,
    createUserModalState,
    setCreateUserModalState,
    openUserModalState,
    setOpenUserModalState,
  };
};
