/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../../Input/TextFieldMask/TextFieldMask";
import Title from "../../Title/Title";
import { Button, Select, MenuItem } from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import { IContact } from "types/Contact";
import ContactService from "data/services/ContactService";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { getBrazilianStates, IState } from "data/services/BrazilianStatesApi";
import Delete from "@material-ui/icons/Delete";
import CompanyContext from "contexts/CompanyContext";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";

const DeleteCompanyModal = ({ id }) => {
  const { deleteCompanyModal, useDeleteCompanyModal } =
    useContext(CompanyContext);
  const { deleteCompany } = useCompanyPage();
  const [states, setStates] = useState<IState[]>([]);

  const [time, setTime] = useState(null);
  const [data, setData] = useState<IContact>({
    name: "",
    company_id: "null",
    state: "",
    city: "",
    email: "",
    phone: "12000000000",
    tag: "null",
  });

  const handleDeleteCompany = async () => {
    try {
      await deleteCompany(id);
      useDeleteCompanyModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useDeleteCompanyModal();
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>

      <Title
        title="Deletar empresa"
        subtitle={
          <>
            <p>
              <strong>
                Tem certeza que deseja deletar esta empresa selecionada?
              </strong>
            </p>
          </>
        }
      />

      <Button
        variant="contained"
        color="error"
        style={{ color: "#ffffff" }}
        onClick={() => handleDeleteCompany()}
        startIcon={<Delete />}
        sx={{ mt: 4 }}
      >
        Deletar
      </Button>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={deleteCompanyModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default DeleteCompanyModal;
