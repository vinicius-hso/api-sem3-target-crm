import React, { useEffect, useState } from "react";
import { Typography, Avatar, Button, Tooltip } from "@material-ui/core";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { NewActivityButton } from "../DealDetailCard/DealDetailCard.style";
import { ButtonsContainer } from "../Modal/ModalStyles/ButtonsContainer";
import {
  UserAccountCardContainer,
  EditButton,
  InputContainer,
  ContainerStyled,
} from "./UserAccountComponent.style";
import { IUser } from "types/User";
import Title from "../Title/Title";
import { emailValidator } from "data/utils/emailValidator";
import { toast } from "react-toastify";

type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
interface UserAccountCardProps {
  user: IUser;
  password: Passwords;

  setUser: (event) => void;
  hasEdit: boolean;
  onClick: () => void;
  saveEdit: (user) => void;

  setUserPassword: (event) => void;
  hasEditPassword: boolean;
  onClickPassword: () => void;
  saveEditPassword: (password) => void;
}

const UserAccountComponent: React.FC<UserAccountCardProps> = ({
  user,
  setUser,
  password,
  setUserPassword,
  ...props
}) => {
  const [submit, isSubmit] = useState(false);
  const [prevUser, setPrevUser] = useState<IUser>({});

  useEffect(() => {
    if (user && !prevUser?.name) setPrevUser(user);
  }, [user]);

  return (
    <div>
      <ContainerStyled>
        <div>
          <Title title="Meus dados" />

          <Tooltip
            title="Alterar senha"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              onClick={() => {
                props.onClickPassword();
                isSubmit(false);
              }}
            >
              <i style={{ marginRight: "2px" }} className="fa fa-unlock"></i>
              Alterar senha
            </Button>
          </Tooltip>
        </div>

        {props.hasEditPassword && (
          <ContainerStyled>
            <Typography variant="h5" color="primary">
              Alterar Senha
            </Typography>
            <UserAccountCardContainer>
              <InputContainer>
                <TextFieldMask
                  label={"Senha atual"}
                  fullWidth
                  variant={"standard"}
                  size="medium"
                  type="password"
                  value={password.oldPassword}
                  error={submit && !password.oldPassword.length}
                  helperText={
                    !password.oldPassword.length && submit
                      ? "Esse campo é obrigatório"
                      : " "
                  }
                  onChange={(event) =>
                    setUserPassword({
                      ...password,
                      oldPassword: event.target.value,
                    })
                  }
                />
              </InputContainer>

              <InputContainer>
                <TextFieldMask
                  label={"Nova Senha"}
                  fullWidth
                  variant={"standard"}
                  type="password"
                  size="medium"
                  value={password.newPassword}
                  error={submit && password?.newPassword?.length < 6}
                  helperText={
                    password?.newPassword?.length < 6 && submit
                      ? "Preenchimento invalido"
                      : " "
                  }
                  onChange={(event) =>
                    setUserPassword({
                      ...password,
                      newPassword: event.target.value,
                    })
                  }
                />
              </InputContainer>

              <InputContainer>
                <TextFieldMask
                  label={"Confirmar Nova Senha"}
                  fullWidth
                  variant={"standard"}
                  type="password"
                  size="medium"
                  value={password.confirmNewPassword}
                  error={submit && !password.confirmNewPassword.length}
                  helperText={
                    !password.confirmNewPassword.length && submit
                      ? "Preenchimento invalido"
                      : " "
                  }
                  onChange={(event) =>
                    setUserPassword({
                      ...password,
                      confirmNewPassword: event.target.value,
                    })
                  }
                />
              </InputContainer>

              <ButtonsContainer>
                <Tooltip
                  title="Salvar alteração"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Button
                    onClick={() => {
                      isSubmit(true);
                      props.saveEditPassword(password);
                    }}
                    variant="contained"
                    size="small"
                    sx={{
                      width: "160px",
                      mt: 1,
                      color: "white",
                    }}
                    color="success"
                    type="submit"
                  >
                    Salvar
                  </Button>
                </Tooltip>
                <Tooltip
                  title="Cancelar alteração"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Button
                    onClick={props.onClickPassword}
                    variant="contained"
                    size="small"
                    color="error"
                    type="submit"
                    sx={{
                      width: "160px",
                      mt: 1,
                    }}
                  >
                    Cancelar
                  </Button>
                </Tooltip>
              </ButtonsContainer>
            </UserAccountCardContainer>
          </ContainerStyled>
        )}

        <UserAccountCardContainer>
          {/* {showSuccessAlert ? (
            <Alert
              title="Sucesso"
              severity="success"
              message="Empresa editada com sucesso!"
            />
          ) : null}
          {showErrorAlert ? (
            <Alert
              title="Erro"
              severity="error"
              message="Ops! Algo deu errado :("
            />
          ) : null} */}
          {!props.hasEdit ? (
            <Tooltip
              title="Editar"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <EditButton
                style={{ right: props.hasEdit ? "80px" : 0 }}
                onClick={() => {
                  setUser(prevUser);
                  props.onClick();
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
                onClick={() => {
                  setUser(prevUser);
                  props.onClick();
                }}
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
                display: !props.hasEdit && "none",
              }}
              onClick={() => {
                if (
                  user?.name?.length &&
                  emailValidator(user?.email) &&
                  user?.picture?.length < 3000
                ) {
                  props.saveEdit(user);
                } else {
                  toast.warning(
                    "Preencha os campos corretamente, e tente novamente"
                  );
                }
              }}
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

          {user && (
            <Avatar
              alt={user?.name?.toUpperCase()}
              src={user?.picture}
              sx={{ width: 126, height: 126, margin: 5 }}
            />
          )}

          <InputContainer>
            <TextFieldMask
              disabled={!props.hasEdit}
              label={"Nome"}
              fullWidth
              variant={"standard"}
              size="medium"
              value={user?.name || ""}
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
              error={!user?.name}
              helperText={!user?.name && "Informe o nome!"}
            />
          </InputContainer>

          <InputContainer>
            <TextFieldMask
              disabled={!props?.hasEdit}
              label={"Email"}
              fullWidth
              variant={"standard"}
              size="medium"
              value={user?.email || ""}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
              error={!emailValidator(user?.email)}
              helperText={!emailValidator(user?.email) && "E-mail invalido!"}
            />
          </InputContainer>

          <InputContainer>
            <TextFieldMask
              disabled={!props.hasEdit}
              label={"Link de imagem"}
              fullWidth
              variant={"standard"}
              size="medium"
              value={user?.picture || ""}
              onChange={(event) =>
                setUser({ ...user, picture: event.target.value })
              }
              error={user?.picture?.length > 3000}
              helperText={
                user?.picture?.length > 3000 &&
                "Link de imagem muito grande, limite de 3000 caracteres!"
              }
            />
          </InputContainer>
        </UserAccountCardContainer>
      </ContainerStyled>
    </div>
  );
};
export default UserAccountComponent;
