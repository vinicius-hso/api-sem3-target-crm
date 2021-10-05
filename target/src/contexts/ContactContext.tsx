import React, { useState, createContext, useEffect } from "react";
import { IContactContext } from "types/Contact";

const ContactContext = createContext<IContactContext>({} as IContactContext);

export const ContactProvider: React.FC = ({ children }) => {
  const [createContactModal, setCreateContactModal] = useState<boolean>(false);

  const useCreateContactModal = () => {
    setCreateContactModal(!createContactModal);
  };

  return (
    <ContactContext.Provider
      value={{
        useCreateContactModal,
        createContactModal,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
