import React, { useContext, useState } from "react";

import { Button, FormControl, MenuItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import {
  ModalContainer,
  ModalStyled,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Select from "../Input/Select/Select";
import theme from "ui/theme/theme";

const CreateDealModal = () => {
  const {
    createDealModalState,
    useCreateDealModal,
    createPipeline,
    createDeal,
  } = useContext(PipelineContext);

  const [data, setData] = useState<any>({
    dealName: "",
    company: "default",
    contact: "default",
    email: "",
    phone: "",
    pipeline: "default",
    startDate: "default",
    price: 999.0,
    tag: "default",
    endDate: "default",
  });

  const body = (
    <ModalContainer>
      <Title title="Adicionar negociação" />

      <TextFieldMask
        onChange={(event) => setData({ ...data, dealName: event.target.value })}
        id="outlined-basic"
        label="Nome da negociação"
        variant="standard"
        size="small"
        fullWidth
      />
      <Select
        onChange={(event) => setData({ ...data, company: event.target.value })}
        label="Empresa"
        value={data.company}
        variant="standard"
        fullWidth
      >
        <MenuItem value={"default"}>Selecione a Empresa</MenuItem>
        <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>
          Cluster8
        </MenuItem>
      </Select>

      <Select
        onChange={(event) => setData({ ...data, contact: event.target.value })}
        label="Contato"
        variant="standard"
        fullWidth
        value={data.contact}
      >
        <MenuItem value={"default"}>Selecionar Contato</MenuItem>
        <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>
          Cluster8
        </MenuItem>
      </Select>
      <TextFieldMask
        onChange={(event) => setData({ ...data, email: event.target.value })}
        id="outlined-basic"
        label="Email"
        variant="standard"
        size="small"
        fullWidth
        style={{ margin: 0 }}
      />
      <TwoColumnsContainer>
        <div>
          <TextFieldMask
            onChange={(event) =>
              setData({ ...data, phone: event.target.value })
            }
            id="outlined-basic"
            label="Telefone"
            variant="standard"
            size="small"
            fullWidth
            placeholder="(12) 99999-9999"
          />
          <Select
            onChange={(event) =>
              setData({ ...data, pipeline: event.target.value })
            }
            label="Pipeline"
            variant="standard"
            fullWidth
            value={data.pipeline}
          >
            <MenuItem value={"default"}>Envio de proposta</MenuItem>
            <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>
              Cluster8
            </MenuItem>
          </Select>
          <TextFieldMask
            id="date"
            label="Início"
            type="date"
            defaultValue=""
            variant="standard"
            className="start-date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextFieldMask
            onChange={(event) =>
              setData({ ...data, price: event.target.value })
            }
            id="outlined-basic"
            label="Valor R$"
            variant="standard"
            size="small"
            fullWidth
            placeholder="999,00"
          />
          <Select
            onChange={(event) => setData({ ...data, tag: event.target.value })}
            label="Tag"
            fullWidth
            variant="standard"
            value={data.tag}
          >
            <MenuItem value={"default"}>Selecione a Tag</MenuItem>
            <MenuItem value={"487adc34-1759-11ec-9621-0242ac130002"}>
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
        onClick={() => createDeal(data)}
        variant="contained"
        color="success"
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
