import React, { useContext } from "react";

import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { Button } from "@material-ui/core";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";

const UpDateModal = () => {
  const {
    updateModalState,
    useUpdateModal,
    updatePipeline,
    setName,
    pipeline,
  } = useContext(PipelineContext);

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useUpdateModal("");
        }}
      ></CloseButtonStyled>

      <Title title="Editar pipeline" />

      <TextFieldMask
        id="outlined-basic"
        label="Nome do pipeline"
        variant="standard"
        size="small"
        fullWidth
        focused={pipeline ? true : false}
        defaultValue={pipeline?.name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button
        onClick={() => updatePipeline()}
        variant="contained"
        color="primary"
        startIcon={<i className="fa fa-pensil"></i>}
        sx={{ mt: 4 }}
      >
        Enviar
      </Button>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={updateModalState}
        onClose={() => useUpdateModal("")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default UpDateModal;
