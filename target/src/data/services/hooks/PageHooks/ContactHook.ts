import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/serviceApi";
import ContactService from "data/services/ContactService";
// import CompanyService from "data/services/CompanyService";

export const useContactPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [contacts, setContacts] = useState([]);
  const [formatContactToSelect, setFormat] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const formatListToSelect = (contacts: any[]): any => {
    setFormat(
      contacts.map((contacts) => {
        return { value: contacts.id, label: contacts.name };
        })
    );
  }
  const getData = async () => {
    const response = await ContactService.getContacts();
    setContacts(response);
    formatListToSelect(response);
  };
  return {
    contacts,
    formatContactToSelect,
  };
};
