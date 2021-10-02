import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/serviceApi";
import UserService from "data/services/UserService";
// import CompanyService from "data/services/CompanyService";

export const useUserPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [users, setUsers] = useState([]);
  const [formatUserToSelect, setFormat] = useState([]);

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


  const getData = async () => {
    const response = await UserService.getUsers();
    setUsers(response);
    formatListToSelect(response);
  };
  return {
    users,
    formatUserToSelect,
  };
};
