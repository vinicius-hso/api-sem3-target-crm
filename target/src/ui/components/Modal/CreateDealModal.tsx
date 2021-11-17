import React, { useContext, useEffect, useState } from "react";
import { Button, MenuItem, Tooltip } from "@material-ui/core";
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
import { formatCurrency } from "data/utils/formatValue";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";

interface DetailModalProps {
  getData: () => any;
}

const CreateDealModal = ({ getData }: DetailModalProps) => {
  const {
    createDealModalState,
    UseCreateDealModal,
    createDeal,
    selectedPipeline,
  } = useContext(PipelineContext);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatListThisCompanyToSelect } = useContactPage();

  const [contacts, setContacts] = useState([]);
  const [submited, isSubmited] = useState(false);

  const [data, setData] = useState<DealTypes>({
    name: "",
    company: "default",
    contact: "default",
    pipeline: "",
    value: "",
    tag: "WARM",
  });

  useEffect(() => {
    if (selectedPipeline) {
      setData({ ...data, pipeline: selectedPipeline });
    }
    isSubmited(false);
  }, [selectedPipeline]);

  async function handleSubmit() {
    isSubmited(true);
    if (data.name) {
      try {
        data.value = data.value.replace(/\D+/g, "");
        createDeal(data);
        await getData();
        setData({
          name: "",
          company: "default",
          contact: "default",
          pipeline: "",
          value: "",
          tag: "WARM",
        });
        UseCreateDealModal();
      } catch (e) {
        console.error(e);
      }
    }
  }

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
            UseCreateDealModal();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Adicionar negociação" />
      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name}
        label="Nome da negociação"
        variant="standard"
        size="small"
        fullWidth
        required
        error={submited && !data.name}
        helperText={submited && !data.name ? "Campo obrigatório" : ""}
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
      <TwoColumnsContainer>
        <div>
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
        </div>
      </TwoColumnsContainer>
      <Tooltip
        title="Adicionar negociação"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
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
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={createDealModalState}
        onClose={() => UseCreateDealModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateDealModal;
