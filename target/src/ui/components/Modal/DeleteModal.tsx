import React, { useContext } from "react";

import { Button, Modal } from "@material-ui/core";

import ModalContext from "contexts/ModalContext";

const DeleteModal: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const { deleteModalState, useDeleteModal } = useContext(ModalContext);

  const styles = {
    box: {
      backgroundColor: "#fff",
      height: "180px",
      width: "450px",
      borderRadius: "10px",
      padding: "15px",
    },
    title: { color: "#E2711D" },
    body: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textBold: {
      fontWeight: "bold",
      margin: 0,
      fontSize: "17px",
    },
    textBody: {
      fontSize: "15px",
      fontWeight: "normal",
      margin: 0,
    },
    button: {
      margin: "20px",
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const body = (
    <div style={styles.box}>
      <h2 style={styles.title} id="simple-modal-title">
        Deletar Pipeline
      </h2>

      <div style={styles.body}>
        <p style={styles.textBold}>
          Tem certeza que deseja deletar esse pipeline?
        </p>

        <h4 style={styles.textBody}>
          Todos as negociações do pipeline serão arquivadas
        </h4>
        <Button
          onClick={() => useDeleteModal()}
          style={styles.button}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        style={styles.modal}
        open={deleteModalState}
        onClose={useDeleteModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};
export default DeleteModal;
