import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/ServiceApi";
import ContactService from "data/services/ContactService";
import contact from "pages/contact";
// import CompanyService from "data/services/CompanyService";

export const useContactPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [contacts, setContacts] = useState([]);
  const [removeFilteredContacts, setRemoveFilteredContacts] = useState([]);
  const [formatContactToSelect, setFormat] = useState([]);
  const [formatContactThisCompanyToSelect, setFormatThisCompany] = useState([]);

  useEffect(() => {
    if (!contacts.length) {
      setTimeout(() => {
        getData();
      }, 500);
    }
  }, []);

  const formatListToSelect = (contacts: any[]): any => {
    setFormat(
      contacts.map((contacts) => {
        return { value: contacts.id, label: contacts.name };
      })
    );
  };

  const formatListThisCompanyToSelect = (companyId): any => {
    const formatedContacts = [];
    contacts.forEach((contact) => {
      if (companyId === contact.company?.id) {
        formatedContacts.push(contact);
      }
    });
    return formatedContacts;
  };

  const filteredContact = async (
    terms: string,
    typeValue: string,
    resetFilter: boolean
  ) => {
    let list = contacts;
    if (resetFilter) list = removeFilteredContacts;
    let filtered = [];
    setContacts([]);
    if (typeValue === "name") {
      filtered = list.filter((contact) =>
        contact.name.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else if (typeValue === "city") {
      filtered = list.filter((contact) =>
        contact?.city.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    } else {
      filtered = list.filter((contact) =>
        contact?.company.id.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    }
    setContacts(filtered);
  };

  const removeFiltered = () => {
    setContacts(removeFilteredContacts);
  };

  const getData = async () => {
    try {
      const response = await ContactService.getContacts();
      setContacts(response);
      setRemoveFilteredContacts(response);
      formatListToSelect(response);
    } catch (err) {}
  };
  return {
    contacts,
    formatContactToSelect,
    formatContactThisCompanyToSelect,
    formatListThisCompanyToSelect,
    filteredContact,
    removeFiltered,
  };
};
