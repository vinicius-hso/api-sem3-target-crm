import React, { useContext } from "react";

import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";

interface UpdateModalProps {
  getData: () => void;
}

const UpDateModal = ({ getData }: UpdateModalProps) => {
  const {
    updateModalState,
    useUpdateModal,
    updatePipeline,
    setName,
    pipeline,
    hasError,
    isLoading,
  } = useContext(PipelineContext);

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
            useUpdateModal("");
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
          fullWidth
          focused={pipeline ? true : false}
          defaultValue={pipeline?.name}
          onChange={(event) => setName(event.target.value)}
        />
      )}
      <Tooltip
        title="Salvar alteração"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={() => {
            updatePipeline();
            setTimeout(() => {
              getData();
            }, 1000);
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
