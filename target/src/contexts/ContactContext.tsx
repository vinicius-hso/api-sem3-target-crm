import ContactService from "data/services/ContactService";
import React, { useState, createContext, useEffect } from "react";
import { IContact, IContactContext } from "types/Contact";

const ContactContext = createContext<IContactContext>({} as IContactContext);

export const ContactProvider: React.FC = ({ children }) => {
  const [createContactModal, setCreateContactModal] = useState<boolean>(false);
  const [importContactModal, setImportContactModal] = useState<boolean>(false);
  const [updateContactModal, setUpdateContactModal] = useState<boolean>(false);
  const [deleteContactModal, setDeleteContactModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>();

  const useCreateContactModal = () => {
    setCreateContactModal(!createContactModal);
  };

  const useImportContactModal = () => {
    setImportContactModal(!importContactModal);
  };

  const useUpdateContactModal = () => {
    setUpdateContactModal(!updateContactModal);
  };

  const useDeleteContactModal = () => {
    setDeleteContactModal(!deleteContactModal);
  };

  const getContacts = async (): Promise<void> => {
    const data = await ContactService.getContacts();
    setContacts(data);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        useCreateContactModal,
        createContactModal,
        useImportContactModal,
        importContactModal,
        useUpdateContactModal,
        updateContactModal,
        useDeleteContactModal,
        deleteContactModal,
        contacts,
        getContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
