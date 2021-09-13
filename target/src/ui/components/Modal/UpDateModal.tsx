import React, { useContext } from "react";

import { Button, Modal } from "@material-ui/core";
import Theme from "ui/theme/theme";
import TextField from "@material-ui/core/TextField";
import ModalContext from "contexts/ModalContext";

const UpDateModal = () => {
  const { updateModalState, useUpdateModal, updatePipeline, setName } =
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
        Editar pipeline
      </h2>
      <div style={styles.body}>
        <TextField
          id="outlined-basic"
          label="Nome do pipeline"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          onClick={() => updatePipeline()}
          variant="contained"
          color="success"
          style={styles.button}
          startIcon={<i className="fa fa-pensil"></i>}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        open={updateModalState}
        onClose={() => useUpdateModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={styles.modal}
      >
        {body}
      </Modal>
    </>
  );
};
export default UpDateModal;
