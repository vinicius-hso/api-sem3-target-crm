import React, { useContext, useEffect, useState } from "react";

import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";

interface UpdateModalProps {
  getData: () => any;
}

const UpDateModal = ({ getData }: UpdateModalProps) => {
  const {
    updateModalState,
    UseUpdateModal,
    updatePipeline,
    pipeline,
    hasError,
    isLoading,
  } = useContext(PipelineContext);
  const [name, setName] = useState(pipeline?.name);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    if (pipeline?.name) {
      setName(pipeline?.name);
    }
  }, [pipeline]);

  const body = (
    <ModalContainer>
      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            UseUpdateModal("");
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Editar pipeline" />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : !isLoading && hasError ? (
        <div>{hasError}</div>
      ) : (
        <TextFieldMask
          id="outlined-basic"
          label="Nome do pipeline"
          variant="standard"
          size="small"
          required
          fullWidth
          focused={pipeline ? true : false}
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={submited && !name}
          helperText={submited && !name && "Nome é obrigatório"}
        />
      )}
      <Tooltip
        title="Salvar alteração"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={async () => {
            setSubmited(true);
            if (name?.length) {
              await updatePipeline(name);
              await getData();
              setSubmited(false);
            }
          }}
          variant="contained"
          color="primary"
          startIcon={<i className="fa fa-pensil"></i>}
          sx={{ margin: "32px auto 0 auto", minWidth: "100px" }}
        >
          Salvar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={updateModalState}
        onClose={() => UseUpdateModal("")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default UpDateModal;
