import React, { useContext } from "react";

import { Button, Modal } from "@material-ui/core";
import Theme from "ui/theme/theme";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ModalContext from "contexts/ModalContext";

const CreateModal = () => {
  const { createModalState, useCreateModal, createPipeline, setName } =
    useContext(ModalContext);
  const styles: any = {
    box: {
      backgroundColor: "#fff",
      width: "450px",
      height: "220px",
      padding: "15px",
      borderRadius: "8px",
    },
    body: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      display: "flex",
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
      color: Theme.palette.primary.main,
    },
    button: {
      color: "#fff",
      margin: "20px",
    },
  };
  const body = (
    <div style={styles.box}>
      <h2 style={styles.title} id="simple-modal-title">
        Novo pipeline
      </h2>
      <div style={styles.body}>
        <TextField
          onChange={(event) => setName(event.target.value)}
          id="outlined-basic"
          label="Nome do pipeline"
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button
          onClick={() => createPipeline()}
          variant="contained"
          color="success"
          style={styles.button}
          startIcon={<AddCircleIcon />}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        open={createModalState}
        onClose={() => useCreateModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={styles.modal}
      >
        {body}
      </Modal>
    </>
  );
};
export default CreateModal;
