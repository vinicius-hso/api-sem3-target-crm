/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import Title from "../../Title/Title";
import { Button } from "@material-ui/core";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import ContactService from "data/services/ContactService";
import Delete from "@material-ui/icons/Delete";

const DeleteContactModal = ({ id }) => {
  const { deleteContactModal, useDeleteContactModal, getContacts } =
    useContext(ContactContext);

  const deleteContact = async () => {
    try {
      await ContactService.deleteContact(id);

      await getContacts();
      useDeleteContactModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useDeleteContactModal();
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>

      <Title
        title="Deletar contato"
        subtitle={
          <>
            <p>
              <strong>
                Tem certeza que deseja deletar o contato selecionado?
              </strong>
            </p>
          </>
        }
      />

      <Button
        variant="contained"
        color="error"
        style={{ color: "#ffffff" }}
        onClick={() => deleteContact()}
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
        open={deleteContactModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default DeleteContactModal;
