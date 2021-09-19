import React, { useContext } from "react";

import { Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import { ModalStyled } from "./ModalStyles/Modal";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";

const CreateModal = () => {
  const { createModalState, useCreateModal, createPipeline, setName } =
    useContext(PipelineContext);

  const body = (
    <ModalContainer>
      <Title title="Novo pipeline" />

      <TextFieldMask
        onChange={(event) => setName(event.target.value)}
        id="outlined-basic"
        label="Nome do pipeline"
        variant="standard"
        size="small"
        fullWidth
      />
      <Button
        onClick={() => createPipeline()}
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        sx={{ mt: 4 }}
      >
        Adicionar
      </Button>
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
