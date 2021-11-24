import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
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
import { toast } from "react-toastify";

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
    company: "",
    contact: "",
    pipeline: "",
    value: "",
    tag: "",
  });

  useEffect(() => {
    if (selectedPipeline) {
      setData({ ...data, pipeline: selectedPipeline });
    }
    isSubmited(false);
  }, [selectedPipeline]);

  async function handleSubmit() {
    isSubmited(true);
    if (data.name && data.company && data.contact && data.tag && data.value) {
      try {
        data.value = data.value.replace(/\D+/g, "");
        await createDeal(data);
        await getData();
        setData({
          name: "",
          company: "",
          contact: "",
          pipeline: "",
          value: "",
          tag: "",
        });
        UseCreateDealModal();
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.warning(
        "Preenchimento invalido, Verique os campos e tente novamente"
      );
    }
  }

  const onClose = () => {
    setData({
      name: "",
      company: "",
      contact: "",
      pipeline: "",
      value: "",
      tag: "",
    });
    UseCreateDealModal();
  };

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
            onClose();
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
        helperText={submited && !data.name ? "Nome é obrigatório" : ""}
      />

      <FormControl>
        <InputLabel
          variant="standard"
          error={submited && !data?.company}
          required
          sx={{ mt: -1 }}
        >
          <span>Empresa</span>
        </InputLabel>
        <Select
          onChange={(event) => {
            setData({ ...data, company: event.target.value });
            setContacts(formatListThisCompanyToSelect(event.target.value));
          }}
          value={data.company}
          label="Empresa"
          variant="standard"
          fullWidth
          error={submited && !data?.company}
        >
          {formatCompaniesToSelect.map((company) => (
            <MenuItem key={company.value} value={company.value}>
              {company.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!data?.company && submited && (
        <Typography variant="caption" color="error">
          Empresa é obrigatória
        </Typography>
      )}

      <FormControl>
        <InputLabel
          variant="standard"
          error={submited && !data.contact}
          required
          sx={{ mt: -1 }}
        >
          Contato
        </InputLabel>
        <Select
          onChange={(event) =>
            setData({ ...data, contact: event.target.value })
          }
          label="Contato"
          value={data.contact}
          variant="standard"
          fullWidth
          error={submited && !data.contact}
        >
          {contacts.map((contact) => (
            <MenuItem key={contact.id} value={contact.id}>
              {contact.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {submited && !data.contact && (
        <Typography variant="caption" color="error">
          Contato é obrigatório
        </Typography>
      )}

      <TwoColumnsContainer>
        <FormControl sx={{ mt: submited && !data.tag && "-5px" }}>
          <InputLabel
            sx={{ mt: -1 }}
            variant="standard"
            error={submited && !data.tag}
            required
          >
            Tag inicial
          </InputLabel>
          <Select
            onChange={(event) => setData({ ...data, tag: event.target.value })}
            label="Tag"
            fullWidth
            required
            value={data.tag}
            variant="standard"
            error={submited && !data.tag}
          >
            <MenuItem value={"COLD"}>Fria</MenuItem>
            <MenuItem value={"WARM"}>Morna</MenuItem>
            <MenuItem value={"HOT"}>Quente</MenuItem>
          </Select>
          {submited && !data.tag && (
            <Typography variant="caption" color="error">
              Tag é obrigatória
            </Typography>
          )}
        </FormControl>

        <div>
          <TextFieldMask
            sx={{ mt: "-5px" }}
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
            required
            error={submited && !data.name}
            helperText={submited && !data.name ? "Nome é obrigatório" : ""}
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
        onClose={() => onClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateDealModal;
