import React, { useContext, useState, useEffect } from "react";
import { Button, Tooltip } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";

interface CreateModalProps {
  getData: () => any;
}

const CreateModal = ({ getData }: CreateModalProps) => {
  const { createModalState, UseCreateModal, createPipeline, setName } =
    useContext(PipelineContext);

  const [submited, isSubmited] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    isSubmited(false);
  }, []);

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
            UseCreateModal();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Novo pipeline" />

      <TextFieldMask
        onChange={(event) => {
          setValue(event.target.value);
          setName(event.target.value);
        }}
        id="outlined-basic"
        label="Nome do pipeline"
        variant="standard"
        size="small"
        fullWidth
        required
        error={submited && !value.length}
        helperText={submited && !value.length ? "Campo obrigatório" : ""}
      />
      <Tooltip
        title="Adicionar pipeline"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={async () => {
            isSubmited(true);
            if (value.length) {
              await createPipeline();
              await getData();
            }
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
        onClose={() => {
          setValue("");
          isSubmited(false);
          UseCreateModal();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateModal;
