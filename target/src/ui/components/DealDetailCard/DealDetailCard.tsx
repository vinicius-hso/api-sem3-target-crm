import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { formatCurrency } from "data/utils/formatValue";
import React, { useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  DealDetailCardContainer,
  EditButton,
  InputContainer,
} from "./DealDetailCard.style";

//@deprecated
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
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatListThisCompanyToSelect } = useContactPage();
  const [contactsThisCompany, setContactsThisCompany] = useState([]);
  const [selectedContact, setSelectedContact] = useState(props.contact);
  const [selectedCompany, setSelectedCompany] = useState(props.company);
  const [isInitialValue, setInitialValue] = useState(true);
  const [value, setValue] = useState(formatCurrency(props.value));
  const [name, setName] = useState(props.name);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
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
      setError(false);
      props.saveEdit(data);
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <Typography
        sx={{
          position: "relative",
          top: "20px",
          left: "15px",
          zIndex: 1,
          display: error ? "inline" : "none",
        }}
        color="error"
        variant="caption"
      >
        <i className="fa fa-info-circle" /> Formulario incompleto
      </Typography>

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
              onClick={props.onClick}
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
          <FormControl fullWidth>
            <TextFieldMask
              disabled={!props.hasEdit}
              label={"Negociação"}
              variant={"standard"}
              size="medium"
              fullWidth
              value={name}
              sx={{ mt: "16px" }}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
        </InputContainer>
        <InputContainer>
          <div>
            <Typography
              color={`${props.hasEdit ? "grey" : "lightgrey"}`}
              variant="caption"
            >
              Empresa
            </Typography>
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
          </div>
        </InputContainer>
        <InputContainer>
          <div>
            <Typography
              color={`${props.hasEdit ? "grey" : "lightgrey"}`}
              variant="caption"
            >
              Contato
            </Typography>
            <Select
              disabled={!props.hasEdit}
              onChange={(event) => {
                setSelectedContact({ value: event.target.value });
              }}
              label="Contato"
              value={selectedContact.value}
              variant="standard"
              fullWidth
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
                <MenuItem
                  key={selectedContact.value}
                  value={selectedContact.value}
                >
                  {selectedContact.label}
                </MenuItem>
              )}
            </Select>
          </div>
        </InputContainer>
        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Valor"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={value}
            onChange={(event) => setValue(formatCurrency(event.target.value))}
          />
        </InputContainer>
        <InputContainer>
          <TextFieldMask
            disabled
            label={"Responsavel"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={props.currentResponsible}
          />
        </InputContainer>
        <InputContainer>
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
    </div>
  );
};
export default DealDetailCard;
