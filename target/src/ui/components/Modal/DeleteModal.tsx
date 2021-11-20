import React, { useContext } from "react";

import { Button, Tooltip } from "@material-ui/core";

import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";

interface DeleteModalProps {
  getData: () => any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ getData }) => {
  const { deleteModalState, UseDeleteModal, deletePipeline } =
    useContext(PipelineContext);

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
            UseDeleteModal("");
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title
        title="Deletar Pipeline"
        subtitle={
          <>
            <p>Tem certeza que deseja deletar esse pipeline?</p>

            <p>
              <strong>Todas as negociações do pipeline serão arquivadas</strong>
            </p>
          </>
        }
      />
      <Tooltip
        title="Deletar pipeline"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={async () => {
            await deletePipeline();
            await getData();
          }}
          variant="contained"
          color="error"
        >
          Deletar
        </Button>
      </Tooltip>
    </ModalContainer>
  );

  return (
    <>
      <ModalStyled
        open={deleteModalState}
        onClose={UseDeleteModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default DeleteModal;
