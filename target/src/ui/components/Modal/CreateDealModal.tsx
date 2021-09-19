import React, { useContext, useState } from "react";

import { Button, FormControl, MenuItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Select from "../Input/Select/Select";
import theme from "ui/theme/theme";
import { ModalStyled } from "./ModalStyles/Modal";
import { DealTypes } from "types/Deal";
import { create } from "@material-ui/core/styles/createTransitions";

const CreateDealModal = () => {
  const {
    createDealModalState,
    useCreateDealModal,
    createPipeline,
    createDeal,
  } = useContext(PipelineContext);

  const [data, setData] = useState<DealTypes>();

  const body = (
    <ModalContainer>
      <Title title="Adicionar negociação" />

      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        id="outlined-basic"
        label="Nome da negociação"
        variant="standard"
        size="small"
        fullWidth
      />
      <Select
        onChange={(event) => setData({ ...data, company: event.target.value })}
        label="Empresa"
        value="default"
        variant="standard"
        fullWidth
      >
        <MenuItem value={"default"}>Selecione a Empresa</MenuItem>
        <MenuItem value={"ec3d93bd-ff6b-4ef8-973d-0848dd84768a"}>
          Cluster8
        </MenuItem>
      </Select>

      <Select
        onChange={(event) => setData({ ...data, contact: event.target.value })}
        label="Contato"
        value="default"
        variant="standard"
        fullWidth
      >
        <MenuItem value={"default"}>Selecionar Contato</MenuItem>
        <MenuItem value={"99bcf53a-4829-464c-ae01-0cf55919f9b7"}>
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
            value="default"
            variant="standard"
            fullWidth
          >
            <MenuItem value={"default"}>Envio de proposta</MenuItem>
            <MenuItem value={"708c98a9-ab68-476b-9e3f-d0b64740a784"}>
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
            value="default"
            variant="standard"
          >
            <MenuItem value={"default"}>Selecione a Tag</MenuItem>
            <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>
              Cluster8
            </MenuItem>
          </Select>
        </div>
        <div>
          <TextFieldMask
            onChange={(event) =>
              setData({ ...data, value: event.target.value })
            }
            id="outlined-basic"
            label="Valor R$"
            size="small"
            variant="standard"
            fullWidth
            placeholder="999,00"
          />
          <Select
            onChange={(event) => setData({ ...data, tag: event.target.value })}
            label="Tag"
            fullWidth
            variant="standard"
          >
            <MenuItem value={"default"}>Selecione a Tag</MenuItem>
            <MenuItem value={"COLD"}>
              Cluster8
            </MenuItem>
          </Select>
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
          console.log(data);
          createDeal(data);
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
        onClose={() => createDeal(data)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateDealModal;
