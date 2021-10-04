import React, { useEffect, useState } from "react";
import UserService from "data/services/UserService";
import { IUser } from "types/User";

// import CompanyService from "data/services/CompanyService";

export const useUserPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [users, setUsers] = useState([]);
  const [formatUsersToSelect, setFormat] = useState([]);
  const [createUserModalState, setCreateUserModalState] =
    useState<boolean>(false);
  
  const [userDetail, setUserDetail] = useState<IUser>({});


  useEffect(() => {
    getData();
  }, []);

  const formatListToSelect = (users: any[]): any => {
    setFormat(
      users.map((user) => {
        return { value: user.id, label: user.name };
      })
    );
  };

  const getData = async () => {
    const response = await UserService.getUsers();
    setUsers(response);
    formatListToSelect(response);
  };

  const filteredUser = async (terms: string, typeValue: string) => {
    if (typeValue === "name")
      setUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(terms.toLocaleLowerCase())
        )
      );
    else
      setUsers(
        users.filter((user) =>
          user?.role.toLowerCase().includes(terms.toLocaleLowerCase())
        )
      );
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    const teste = await JSON.parse(localStorage.getItem("dealsListFilter"));
    setUsers(teste);
    if (!isNewSearched) {
      localStorage.removeItem("dealsListFilter");
    }
  };


  const createUser = async (data: IUser) => {
    await UserService.createUser(data);
    useCreateUserModal();
  };

  const useCreateUserModal = () => {
    setCreateUserModalState(!createUserModalState);
  };

  const useUserDetailModal = (userDetail: any) => {
    // console.log('Oi!')
    // console.log(companyDetail);
    setUserDetail(userDetail);
  };

  const editUser = async (userId: any, data: any) => {
    const response = await UserService.editUser(userId, data);
  };

  const deleteUser = async (userId: any) => {
    const response = await UserService.deleteUser(userId);
  };



  return {
    users,
    formatUsersToSelect,
    filteredUser,
    removeFiltered,
    // CREATE MODAL
    createUser,
    useCreateUserModal,
    createUserModalState,
    setCreateUserModalState,
    setUserDetail,
    useUserDetailModal,
    editUser,
    userDetail,
    deleteUser,
  };
};
