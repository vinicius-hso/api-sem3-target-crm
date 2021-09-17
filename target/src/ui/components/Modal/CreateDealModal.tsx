import React, { useContext } from "react";

import { Button, Modal, FormControl, Select, MenuItem } from "@material-ui/core";
import Theme from "ui/theme/theme";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ModalContext from "contexts/ModalContext";

const CreateDealModal = () => {
  const { createModalState, useCreateModal, createPipeline, setName } =
    useContext(ModalContext);
  const styles: any = {
    box: {
      backgroundColor: "#fff",
      width: "450px",
      height: "auto",
      padding: "20px 35px",
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
    column: {
      width: "45%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    input: {
      margin: "7px 0"
    },
    select: {
      margin: "15px 0"
    }
  };
  const body = (
    <div style={styles.box}>
      <h2 style={styles.title} id="simple-modal-title">
        Adicionar negociação
      </h2>
      <div style={styles.body}>
        <TextField
          onChange={(event) => setName(event.target.value)}
          id="outlined-basic"
          label="Nome da negociação"
          variant="outlined"
          size="small"
          fullWidth
          style={styles.input}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
          <Select
            onChange={() => { }}
            label="Empresa"
            autoWidth
            value={"default"}
            style={styles.select}>
            <MenuItem value={"default"}>Selecione a Empresa</MenuItem>
          </Select>

          <Select
            onChange={() => { }}
            label="Contato"
            autoWidth
            value={"default"}
            style={styles.select}>
            <MenuItem value={"default"}>Selecionar Contato</MenuItem>
          </Select>

        </FormControl>
        <TextField
          onChange={(event) => setName(event.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          style={styles.input}
        />
        <div style={styles.row}>
          <div style={styles.column}>
            <TextField
              onChange={(event) => setName(event.target.value)}
              id="outlined-basic"
              label="Telefone"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="(12) 99999-9999"
              style={styles.input}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
              <Select
                onChange={() => { }}
                label="Pipeline"
                autoWidth
                value={"default"}
                style={styles.select}>
                <MenuItem value={"default"}>Envio de proposta</MenuItem>
              </Select>
              <Select
                onChange={() => { }}
                label="Data início"
                autoWidth
                value={"default"}
                style={styles.select}>
                <MenuItem value={"default"}>30/08/2021</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={styles.column}>
            <TextField
              onChange={(event) => setName(event.target.value)}
              id="outlined-basic"
              label="Valor R$"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="999,00"
              style={styles.input}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
              <Select
                onChange={() => { }}
                label="Tag"
                autoWidth
                value={"default"}
                style={styles.select}>
                <MenuItem value={"default"}>Selecione a Tag</MenuItem>
              </Select>
              <Select
                onChange={() => { }}
                label="Data término"
                autoWidth
                value={"default"}
                style={styles.select}>
                <MenuItem value={"default"}>30/09/2021</MenuItem>
              </Select>
            </FormControl>
          </div></div>
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
export default CreateDealModal;
