import React, { useContext } from "react";

import { Button, Tooltip } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";

interface CreateModalProps {
  getData: () => void;
}

const CreateModal = ({ getData }: CreateModalProps) => {
  const { createModalState, useCreateModal, createPipeline, setName } =
    useContext(PipelineContext);

  const body = (
    <ModalContainer>
      <Tooltip title="Fechar" placement="top-start">
        <CloseButtonStyled
          onClick={() => {
            useCreateModal();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Novo pipeline" />

      <TextFieldMask
        onChange={(event) => setName(event.target.value)}
        id="outlined-basic"
        label="Nome do pipeline"
        variant="standard"
        size="small"
        fullWidth
      />
      <Tooltip title="Adicionar pipeline" placement="top-start">
        <Button
          onClick={() => {
            createPipeline();
            setTimeout(() => {
              getData();
            }, 1000);
          }}
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          sx={{ mt: 4 }}
        >
          Adicionar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={createModalState}
        onClose={() => useCreateModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateModal;
