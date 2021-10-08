import { FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import React, { useContext, useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import PipelineContext from "contexts/PipelineContext";
import Alert from '../AlertComponent/AlertComponent';
import {
  CompanyDetailCardContainer,
  EditButton,
  InputContainer,
} from "./CompanyDetailCard.style";

//@deprecated
interface CompanyDetailCardProps {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  site: string;
  picture: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const DealDetailCard: React.FC<CompanyDetailCardProps> = (props) => {
  
  const { editCompany } = useCompanyPage();
  const [name, setName] = useState(props.name);
  const [city, setCity] = useState(props.city);
  const [state, setState] = useState(props.state);
  const [country, setCountry] = useState(props.country);
  const [site, setSite] = useState(props.site);
  const [picture, setPicture] = useState(props.picture);
  const [error, setError] = useState(false);
  const [showErrorAlert, isShowErrorAlert] = useState(false);
  const [showSuccessAlert, isShowSuccessAlert] = useState(false);
  const [submit, isSubmit] = useState(false);

  const handleSubmit = () => {
    isSubmit(true);
    const id = props.id;
    const data = {
      name,
      city,
      state,
      country,
      site,
      picture,
    };
     //* Funcionando apenas o SuccessAlert e ErrorAlert
     (data.name ? editCompany(id, data).then((resp) => {
       const t = Object.keys(resp).length;
       if (resp['status'] === 200) {
         isShowSuccessAlert(true);
         setTimeout(() => {isShowSuccessAlert(false)}, 3000)
         window.location.reload();
       } else if (t === 2) {
        isShowErrorAlert(true);
        setTimeout(() => {isShowErrorAlert(false)}, 3000)
       }
    }) : null );
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

      <CompanyDetailCardContainer>

        {(showSuccessAlert ? <Alert severity="success" message="Empresa editada com sucesso!"/> : null)}
        {(showErrorAlert ? <Alert severity="error" message="Ops! Algo deu errado :("/> : null)}

        <EditButton
          style={{ right: props.hasEdit ? "80px" : 0 }}
          onClick={props.onClick}
        >
          {!props.hasEdit ? "Editar" : "Cancelar"}
          <i
            style={{ marginLeft: "2px" }}
            className={`fa fa-${!props.hasEdit ? "pencil" : "times"}`}
            aria-hidden="true"
          ></i>
        </EditButton>
        <EditButton
          style={{
            display: props.hasEdit ? "inline" : "none",
          }}
          onClick={handleSubmit}
        >
          {"Salvar"}
          <i
            style={{ marginLeft: "2px" }}
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </EditButton>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Nome"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.name}
            onChange={(event) => setName(event.target.value)}
            error={submit && !name}
            helperText={!name && submit ? 'Nome é obrigatório' : ' '}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Cidade"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.city}
            onChange={(event) => setCity(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Estado"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.state}
            onChange={(event) => setState(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"País"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Site"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.site}
            onChange={(event) => setSite(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Link de imagem"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.picture}
            onChange={(event) => setPicture(event.target.value)}
          />
        </InputContainer>
      </CompanyDetailCardContainer>
    </div>
  );
};
export default DealDetailCard;
