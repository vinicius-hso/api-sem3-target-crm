import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/serviceApi";
import UserService from "data/services/UserService";
// import CompanyService from "data/services/CompanyService";

export const useUserPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [users, setUsers] = useState([]);
  const [formatUserToSelect, setFormat] = useState([]);
  const [formatUserThisCompanyToSelect, setFormatThisCompany] = useState([]);

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

  const formatListThisCompanyToSelect = (companyId): any => {
    const formatedUsers = [];
    users.forEach((user) => {
      if (companyId === user.company.id) {
        formatedUsers.push(user);
      }
    });
    return formatedUsers;
  };

  const getData = async () => {
    const response = await UserService.getUsers();
    setUsers(response);
    formatListToSelect(response);
  };
  return {
    users,
    formatUserToSelect,
    formatListThisCompanyToSelect,
  };
};
