import React, { useContext, useState } from "react";
import { Button, MenuItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Select from "../Input/Select/Select";
import { ModalStyled } from "./ModalStyles/Modal";
import { DealTypes } from "types/Deal";

const CreateDealModal = () => {
  const { createDealModalState, useCreateDealModal, createDeal } =
    useContext(PipelineContext);

  const [data, setData] = useState<DealTypes>({
    name: "",
    company: "",
    contact: "",
    pipeline: "",
    value: 0,
    tag: "COLD",
  });

  async function handleSubmit() {
    console.log(data);
    createDeal(data);
  }

  const body = (
    <ModalContainer>
      <Title title="Adicionar negociação" />
      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name}
        label="Nome da negociação"
        variant="standard"
        size="small"
        fullWidth
      />
      <Select
        onChange={(event) => setData({ ...data, company: event.target.value })}
        value={data.company}
        label="Empresa"
        variant="standard"
        fullWidth
      >
        <MenuItem value={""}>Selecione a Empresa</MenuItem>
        <MenuItem value={"aabce0c7-964c-4ffd-ad80-95c8ead4f367"}>
          Cluster8
        </MenuItem>
      </Select>

      <Select
        onChange={(event) => setData({ ...data, contact: event.target.value })}
        label="Contato"
        value={data.contact}
        variant="standard"
        fullWidth
      >
        <MenuItem value={""}>Selecionar Contato</MenuItem>
        <MenuItem value={"e0566909-9ae7-46e5-8b65-a5ca133a137d"}>
          Cluster8
        </MenuItem>
      </Select>
      {/* <TextFieldMask
        onChange={(event) => setData({ ...data, email: event.target.value })}
        id="outlined-basic"
        label="Email"
        variant="standard"
        size="small"
        fullWidth
        style={{ margin: 0 }}
      /> */}
      <TwoColumnsContainer>
        <div>
          {/* <TextFieldMask
            onChange={(event) =>
              setData({ ...data, phone: event.target.value })
            }
            id="outlined-basic"
            label="Telefone"
            variant="standard"
            size="small"
            fullWidth
            placeholder="(12) 99999-9999"
          /> */}
          <Select
            onChange={(event) =>
              setData({ ...data, pipeline: event.target.value })
            }
            label="Pipeline"
            value={data.pipeline}
            variant="standard"
            fullWidth
          >
            <MenuItem value={""}>Envio de proposta</MenuItem>
            <MenuItem value={"eb7d54d4-db90-45ca-900f-e734c2be2d54"}>
              Cluster8
            </MenuItem>
          </Select>
          {/* <TextFieldMask
            id="date"
            label="Início"
            type="date"
            defaultValue=""
            variant="standard"
            className="start-date"
            InputLabelProps={{
              shrink: true,
            }} */}
          <Select
            onChange={(event) => setData({ ...data, tag: event.target.value })}
            label="Tag"
            fullWidth
            value={data.tag}
            variant="standard"
          >
            <MenuItem value={"COLD"}>Fria</MenuItem>
            <MenuItem value={"WARM"}>Morna</MenuItem>
            <MenuItem value={"HOT"}>Quente</MenuItem>
          </Select>
        </div>
        <div>
          <TextFieldMask
            onChange={(event) =>
              setData({ ...data, value: event.target.value })
            }
            value={data.value}
            id="outlined-basic"
            label="Valor R$"
            size="small"
            variant="standard"
            fullWidth
            placeholder="999,00"
          />
          <TextFieldMask
            id="date"
            label="Término"
            type="date"
            variant="standard"
            defaultValue=""
            className="finish-date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </TwoColumnsContainer>
      <Button
        onClick={() => {
          handleSubmit();
        }}
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        startIcon={<AddCircleIcon />}
      >
        Adicionar
      </Button>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={createDealModalState}
        onClose={() => useCreateDealModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateDealModal;
