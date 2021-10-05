import React, { useState, createContext, useEffect } from "react";
import { IContactContext } from "types/Contact";

const ContactContext = createContext<IContactContext>({} as IContactContext);

export const ContactProvider: React.FC = ({ children }) => {
  const [createContactModal, setCreateContactModal] = useState<boolean>(false);
  const [updateContactModal, setUpdateContactModal] = useState<boolean>(false);

  const useCreateContactModal = () => {
    setCreateContactModal(!createContactModal);
  };

  const useUpdateContactModal = () => {
    setUpdateContactModal(!updateContactModal);
  };


  return (
    <ContactContext.Provider
      value={{
        useCreateContactModal,
        createContactModal,
        useUpdateContactModal,
        updateContactModal
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
