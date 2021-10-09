import { Typography, Avatar } from '@material-ui/core';
import { useUserPage } from 'data/services/hooks/PageHooks/UserHook';
import React, { useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Alert from '../AlertComponent/AlertComponent';
import {
  UserAccountCardContainer,
  EditButton,
  InputContainer,
  ContainerStyled
} from "./UserAccountComponent.style";

//@deprecated
interface UserAccountCardProps {
  user: any;
  password: any;
  
  setUser: any;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;

  setUserPassword: any;
  hasEditPassword: boolean;
  onClickPassword: any;
  saveEditPassword: any;
}

const UserAccountComponent: React.FC<UserAccountCardProps> = ({user, setUser, password, setUserPassword, ...props}) => {
  
  const [showErrorAlert] = useState(false);
  const [showSuccessAlert] = useState(false);

  return (
    <div>
      <ContainerStyled>

        <Typography variant='h4' color='primary'>Editar Perfil</Typography>

        <UserAccountCardContainer>

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
              sx={{ width: 126, height: 126, margin: 5 }}
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
        </UserAccountCardContainer>
      </ContainerStyled>
      
      {/* TODO -> lógica */}
      <ContainerStyled>
        <Typography variant='h5' color='primary'>Editar Senha</Typography>
        <UserAccountCardContainer>
          <EditButton
            style={{ right: props.hasEditPassword ? "80px" : 0 }}
            onClick={props.onClickPassword}
          >
            {!props.hasEditPassword ? "Editar" : "Cancelar"}
            <i
              style={{ marginLeft: "2px" }}
              className={`fa fa-${!props.hasEditPassword ? "pencil" : "times"}`}
              aria-hidden="true"
            ></i>
          </EditButton>
          <EditButton
            style={{
              display: props.hasEditPassword ? "inline" : "none",
            }}
            onClick={() => {props.saveEditPassword(password)}}
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
              disabled={!props.hasEditPassword}
              label={"Senha"}
              fullWidth
              variant={"standard"}
              size="medium"
              value={password.oldPassword}
              onChange={(event) => setUserPassword({...password, oldPassword: event.target.value})}
            />
          </InputContainer>

          <InputContainer>
            <TextFieldMask
              disabled={!props.hasEditPassword}
              label={"Nova Senha"}
              fullWidth
              variant={"standard"}
              size="medium"
              value={password.newPassword}
              onChange={(event) => setUserPassword({...password, newPassword: event.target.value})}
            />
          </InputContainer>

        </UserAccountCardContainer>
      </ContainerStyled>
    </div>
  );
};
export default UserAccountComponent;
