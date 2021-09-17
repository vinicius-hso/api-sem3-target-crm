import React, { useContext, useState } from "react";

import { Button, Modal, FormControl, Select, MenuItem } from "@material-ui/core";
import Theme from "ui/theme/theme";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ModalContext from "contexts/ModalContext";
import { DealTypes } from "types/Deal";

const CreateDealModal = () => {
  const { createDealModalState, useCreateDealModal, createPipeline, createDeal } =
    useContext(ModalContext);

  const [data, setData] = useState<any>({
    dealName: "",
    company: "default",
    contact: "default",
    email: "",
    phone: "",
    pipeline: "default",
    startDate: "default",
    price: 999.00,
    tag: "default",
    endDate: "default",
  })

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
          onChange={(event) => setData({ ...data, dealName: event.target.value })}
          id="outlined-basic"
          label="Nome da negociação"
          variant="outlined"
          size="small"
          fullWidth
          style={styles.input}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
          <Select
            onChange={(event) => setData({ ...data, company: event.target.value })}
            label="Empresa"
            autoWidth
            value={data.company}
            style={styles.select}>
            <MenuItem value={"default"}>Selecione a Empresa</MenuItem>
            <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>Cluster8</MenuItem>
          </Select>

          <Select
            onChange={(event) => setData({ ...data, contact: event.target.value })}
            label="Contato"
            autoWidth
            value={data.contact}
            style={styles.select}>
            <MenuItem value={"default"}>Selecionar Contato</MenuItem>
            <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>Cluster8</MenuItem>
          </Select>

        </FormControl>
        <TextField
          onChange={(event) => setData({ ...data, email: event.target.value })}
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
              onChange={(event) => setData({ ...data, phone: event.target.value })}
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
                onChange={(event) => setData({ ...data, pipeline: event.target.value })}
                label="Pipeline"
                autoWidth
                value={data.pipeline}
                style={styles.select}>
                <MenuItem value={"default"}>Envio de proposta</MenuItem>
                <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>Cluster8</MenuItem>
              </Select>
              <Select
                onChange={(event) => setData({ ...data, startDate: event.target.value })}
                label="Data início"
                autoWidth
                value={data.startDate}
                style={styles.select}>
                <MenuItem value={"default"}>30/08/2021</MenuItem>
                <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>Cluster8</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={styles.column}>
            <TextField
              onChange={(event) => setData({ ...data, price: event.target.value })}
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
                onChange={(event) => setData({ ...data, tag: event.target.value })}
                label="Tag"
                autoWidth
                value={data.tag}
                style={styles.select}>
                <MenuItem value={"default"}>Selecione a Tag</MenuItem>
                <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>Cluster8</MenuItem>
              </Select>
              <Select
                onChange={(event) => setData({ ...data, endDate: event.target.value })}
                label="Data término"
                autoWidth
                value={data.endDate}
                style={styles.select}>
                <MenuItem value={"default"}>30/09/2021</MenuItem>
                <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>Cluster8</MenuItem>
              </Select>
            </FormControl>
          </div></div>
        <Button
          onClick={() => createDeal(data)}
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
        open={createDealModalState}
        onClose={() => createDeal(data)}
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
