import { Typography, Avatar } from '@material-ui/core';
import { useUserPage } from 'data/services/hooks/PageHooks/UserHook';
import React, { useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Alert from '../AlertComponent/AlertComponent';
import {
  CompanyDetailCardContainer,
  EditButton,
  InputContainer,
} from "./UserAccountComponent.style";

//@deprecated
interface UserAccountCardProps {
  user: any;
  
  setUser: any;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const UserAccountComponent: React.FC<UserAccountCardProps> = ({user, setUser, ...props}) => {
  
  const [error, setError] = useState(false);
  const [showErrorAlert, isShowErrorAlert] = useState(false);
  const [showSuccessAlert, isShowSuccessAlert] = useState(false);
  const [submit, isSubmit] = useState(false);


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
          onClick={() => {props.saveEdit(user)}}
        >
          {"Salvar"}
          <i
            style={{ marginLeft: "2px" }}
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </EditButton>

        {user ? <Avatar
            alt={user.name}
            src={user.picture}
            sx={{ width: 56, height: 56 }}
        /> : <div></div>}

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Nome"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={user.name}
            onChange={(event) => setUser({...user, name: event.target.value})}
            // error={submit && !user.name}
            // helperText={!user.name && submit ? 'Nome é obrigatório' : ' '}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Email"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={user.email}
            onChange={(event) => setUser({...user, email: event.target.value})}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Link de imagem"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={user.picture}
            onChange={(event) => setUser({...user, picture: event.target.value})}
          />
        </InputContainer>
      </CompanyDetailCardContainer>
    </div>
  );
};
export default UserAccountComponent;
