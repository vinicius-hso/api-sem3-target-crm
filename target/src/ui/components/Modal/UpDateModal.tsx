import React, { useContext } from "react";

import PipelineContext from "contexts/PipelineContext";
import { ModalContainer } from "./ModalStyles/ModalContainer";
import Title from "../Title/Title";
import { ModalStyled } from "./ModalStyles/Modal";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { Button } from "@material-ui/core";

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
