import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Tooltip,
  InputLabel,
} from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { formatCurrency, formatValue } from "data/utils/formatValue";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  DealDetailCardContainer,
  EditButton,
  InputContainer,
} from "./DealDetailCard.style";

interface DealDetailCardProps {
  company: any;
  contact: any;
  name: string;
  value: string;
  status: string;
  currentResponsible: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const DealDetailCard: React.FC<DealDetailCardProps> = (props) => {
  const [prevData, setPrevData] = useState(props);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatListThisCompanyToSelect } = useContactPage();
  const [contactsThisCompany, setContactsThisCompany] = useState([]);
  const [selectedContact, setSelectedContact] = useState(props.contact);
  const [selectedCompany, setSelectedCompany] = useState(props.company);
  const [isInitialValue, setInitialValue] = useState(true);
  const [value, setValue] = useState(
    formatCurrency(formatValue(Number(props.value)))
  );
  const [name, setName] = useState(props.name);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    if (!prevData?.name) setPrevData(props);
  }, [props]);

  const handleSubmit = () => {
    setSubmited(true);
    const data = {
      company: selectedCompany.value,
      contact: selectedContact.value,
      name,
      value,
    };
    if (
      value &&
      data.company.length &&
      data.contact !== "default" &&
      name.length
    ) {
      setSubmited(false);
      props.saveEdit(data);
    } else {
      toast.warning(
        "Preenchimento invalido, verifique os campos e tente novamente."
      );
    }
  };
  return (
    <DealDetailCardContainer>
      {!props.hasEdit ? (
        <Tooltip
          title="Editar"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <EditButton
            style={{
              right: props.hasEdit ? "80px" : 0,
            }}
            onClick={() => {
              if (prevData?.name && !props.hasEdit) {
                setName(prevData?.name);
                setValue(formatCurrency(formatValue(Number(prevData?.value))));
                setSelectedCompany(prevData?.company);
                setSelectedContact(prevData?.contact);
              }
              setTimeout(() => {
                props.onClick();
              }, 1000);
            }}
          >
            {!props.hasEdit ? "Editar" : "Cancelar"}
            <i
              style={{ marginLeft: "2px" }}
              className={`fa fa-${!props.hasEdit ? "pencil" : "times"}`}
              aria-hidden="true"
            ></i>
          </EditButton>
        </Tooltip>
      ) : (
        <Tooltip
          title="Cancelar"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <EditButton
            style={{ right: props.hasEdit ? "80px" : 0 }}
            onClick={props.onClick}
            color={props.hasEdit ? "error" : "primary"}
          >
            {!props.hasEdit ? "Editar" : "Cancelar"}
            <i
              style={{ marginLeft: "2px" }}
              className={`fa fa-${!props.hasEdit ? "pencil" : "times"}`}
              aria-hidden="true"
            ></i>
          </EditButton>
        </Tooltip>
      )}

      <Tooltip
        title="Salvar alterações"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <EditButton
          style={{
            display: props.hasEdit ? "inline" : "none",
          }}
          onClick={handleSubmit}
          color={props.hasEdit ? "success" : "primary"}
        >
          {"Salvar"}
          <i
            style={{ marginLeft: "2px" }}
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </EditButton>
      </Tooltip>

      <InputContainer>
        <FormControl fullWidth sx={{ mt: !name && submited ? 6 : 3 }}>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Negociação"}
            variant={"standard"}
            size="medium"
            fullWidth
            required
            value={name}
            sx={{ mt: 1 }}
            onChange={(event) => setName(event.target.value)}
            error={!name && submited}
            helperText={submited && !name ? "Negociação é obrigatória" : ""}
          />
        </FormControl>
      </InputContainer>

      <FormControl sx={{ mt: 3 }}>
        <InputLabel
          variant="standard"
          error={submited && !selectedCompany.value}
          required
          disabled={!props.hasEdit}
        >
          Empresa
        </InputLabel>
        <Select
          disabled={!props.hasEdit}
          onChange={(event) => {
            setSelectedCompany({ value: event.target.value });
            setInitialValue(false);
            const temp = formatListThisCompanyToSelect(event.target.value);
            temp.unshift({ name: "Escolha um contato", id: "default" });
            setContactsThisCompany(temp);
            setSelectedContact({ value: temp[0].id });
          }}
          value={selectedCompany.value}
          label="Empresa"
          variant="standard"
          fullWidth
        >
          {formatCompaniesToSelect.map((company) => (
            <MenuItem key={company.value} value={company.value}>
              {company.label}
            </MenuItem>
          ))}
        </Select>
        {submited && !selectedCompany.value && (
          <Typography variant="caption" color="error">
            Empresa é obrigatória
          </Typography>
        )}
      </FormControl>

      <FormControl
        sx={{ mt: submited && selectedContact.value === "default" ? 5 : 3 }}
      >
        <InputLabel
          variant="standard"
          error={submited && selectedContact.value === "default"}
          required
          disabled={!props.hasEdit}
        >
          Contato
        </InputLabel>
        <Select
          disabled={!props.hasEdit}
          onChange={(event) => {
            setSelectedContact({ value: event.target.value });
          }}
          label="Contato"
          value={selectedContact.value}
          variant="standard"
          fullWidth
          error={submited && selectedContact.value === "default"}
        >
          {contactsThisCompany.length && !isInitialValue ? (
            contactsThisCompany.map((contact) => (
              <MenuItem key={contact.id} value={contact.id}>
                {contact.name}
              </MenuItem>
            ))
          ) : !contactsThisCompany.length && !isInitialValue ? (
            <MenuItem value="default">Empresa sem contatos</MenuItem>
          ) : (
            <MenuItem key={selectedContact.value} value={selectedContact.value}>
              {selectedContact.label}
            </MenuItem>
          )}
        </Select>
        {submited && selectedContact.value === "default" && (
          <Typography variant="caption" color="error">
            Contato é obrigatório
          </Typography>
        )}
      </FormControl>

      <InputContainer
        style={{ marginBottom: !value && submited ? "-20px" : 0 }}
        className="deal-value-responsible"
      >
        <TextFieldMask
          disabled={!props.hasEdit}
          label={"Valor"}
          fullWidth
          required
          variant={"standard"}
          size="medium"
          value={value}
          onChange={(event) => setValue(formatCurrency(event.target.value))}
          error={!value && submited}
          helperText={submited && !value ? "Valor é obrigatório" : ""}
        />
      </InputContainer>

      <InputContainer className="deal-value-responsible">
        <TextFieldMask
          disabled
          label={"Responsavel"}
          fullWidth
          variant={"standard"}
          size="medium"
          value={props.currentResponsible}
        />
      </InputContainer>
      <InputContainer className="deal-value-responsible">
        <TextFieldMask
          disabled
          label={"Status"}
          fullWidth
          variant={"standard"}
          size="medium"
          value={props.status}
        />
      </InputContainer>
    </DealDetailCardContainer>
  );
};
export default DealDetailCard;
