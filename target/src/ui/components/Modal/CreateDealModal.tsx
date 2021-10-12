import React, { useContext, useEffect, useState } from "react";
import { Button, MenuItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Select from "../Input/Select/Select";
import { DealTypes } from "types/Deal";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import {
  formatCurrency,
  formatValue,
  formatValueToSave,
} from "data/utils/formatValue";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";

const CreateDealModal = () => {
  const {
    createDealModalState,
    useCreateDealModal,
    createDeal,
    selectedPipeline,
  } = useContext(PipelineContext);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatListThisCompanyToSelect } = useContactPage();

  const [contacts, setContacts] = useState([]);

  const [data, setData] = useState<DealTypes>({
    name: "",
    company: "default",
    contact: "default",
    pipeline: "",
    value: "",
    tag: "WARM",
  });
  useEffect(() => {
    if (selectedPipeline.length) {
      setData({ ...data, pipeline: selectedPipeline });
    }
  }, [selectedPipeline]);

  async function handleSubmit() {
    data.value = formatValueToSave(data.value);
    data.value = Number(data.value);
    createDeal(data);
  }

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useCreateDealModal();
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>
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
        onChange={(event) => {
          setData({ ...data, company: event.target.value });
          setContacts(formatListThisCompanyToSelect(event.target.value));
        }}
        value={data.company}
        label="Empresa"
        variant="standard"
        fullWidth
      >
        <MenuItem value="default">Selecione uma empresa</MenuItem>
        {formatCompaniesToSelect.map((company) => (
          <MenuItem key={company.value} value={company.value}>
            {company.label}
          </MenuItem>
        ))}
      </Select>
      <Select
        onChange={(event) => setData({ ...data, contact: event.target.value })}
        label="Contato"
        value={data.contact}
        variant="standard"
        fullWidth
      >
        <MenuItem value={"default"}>Selecione um contato</MenuItem>
        {contacts.map((contact) => (
          <MenuItem key={contact.id} value={contact.id}>
            {contact.name}
          </MenuItem>
        ))}
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
          {/*           <Select
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
 */}{" "}
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
              setData({ ...data, value: formatCurrency(event.target.value) })
            }
            value={data.value}
            id="outlined-basic"
            label="Valor R$"
            size="small"
            variant="standard"
            fullWidth
            placeholder="999,00"
          />
          {/*           <TextFieldMask
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
 */}{" "}
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