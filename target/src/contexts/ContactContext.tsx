import ContactService from "data/services/ContactService";
import { serviceApi } from "data/services/ServiceApi";
import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { IContact, IContactContext } from "types/Contact";

const ContactContext = createContext<IContactContext>({} as IContactContext);

export const ContactProvider: React.FC = ({ children }) => {
  const [createContactModal, setCreateContactModal] = useState<boolean>(false);
  const [importContactModal, setImportContactModal] = useState<boolean>(false);
  const [updateContactModal, setUpdateContactModal] = useState<boolean>(false);
  const [deleteContactModal, setDeleteContactModal] = useState<boolean>(false);
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [persistedContactsLists, setPersistedContactsLists] = useState<IContact[]>();

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

  const sendImportedContacts = async (contacts: IContact[]): Promise<any> => {
    let errors = [];
    for await (let contact of contacts) {
      try {
        await serviceApi.post("/contact", contact);
      } catch (err) {
        errors.push(contact);
      }
    }
    if (errors.length < contacts.length) {
      toast.success(
        `${contacts.length - errors.length} contatos criados com sucesso!`
      );
    } else if (errors.length === contacts.length) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
    }
    return errors;
  };

  const getContacts = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await ContactService.getContacts();
      setContacts(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar empresas, verifique sua conexão e tente novamente"
      );
    }
  };

  const filteredContact = async (
    terms: string,
    typeValue: string,
    resetFilter: boolean
  ) => {
    let list = contacts;
    setPersistedContactsLists(contacts)
    if (resetFilter) list = persistedContactsLists;
    let filtered = [];
    setContacts([]);

    const applyFilter = {
      name: () => {
        filtered = list.filter((contact) =>
          contact.name.toLowerCase().includes(terms.toLocaleLowerCase())
        );
      },
      city: () => {
        filtered = list.filter((contact) =>
          contact?.city.toLowerCase().includes(terms.toLocaleLowerCase())
        );
      },
      state: () => {
        filtered = list.filter((contact) =>
          contact?.state.toLowerCase().includes(terms.toLocaleLowerCase())
        );
      },
    };

    applyFilter[typeValue];

    setContacts(filtered);
  };

  const removeFiltered = () => {
    setContacts(persistedContactsLists);
  };

  useEffect(() => {
    if (!contacts?.length) getContacts();
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
        sendImportedContacts,
        contacts,
        getContacts,
        filteredContact,
        removeFiltered,
        isLoading,
        hasError,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
