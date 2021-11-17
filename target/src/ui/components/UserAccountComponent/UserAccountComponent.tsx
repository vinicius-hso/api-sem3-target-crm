import React from "react";
import { Typography, Avatar, Button, Tooltip } from "@material-ui/core";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  NewActivityButton,
  NewActivityButtonLabel,
} from "../DealDetailCard/DealDetailCard.style";
import { ButtonsContainer } from "../Modal/ModalStyles/ButtonsContainer";
import {
  UserAccountCardContainer,
  EditButton,
  InputContainer,
  ContainerStyled,
} from "./UserAccountComponent.style";
import { IUser } from "types/User";
import Title from "../Title/Title";

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
  return (
    <div>
      <ContainerStyled>
        <div>
          <Title title="Meus dados" />
        </div>

        <ContainerStyled>
          <div style={{ position: "relative" }}>
            <Tooltip
              title="Alterar senha"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <NewActivityButton
                variant="contained"
                size="small"
                color="primary"
                type="submit"
                onClick={props.onClickPassword}
              >
                <i style={{ marginRight: "2px" }} className="fa fa-unlock"></i>
                <NewActivityButtonLabel> Alterar senha</NewActivityButtonLabel>
              </NewActivityButton>
            </Tooltip>
          </div>
        </ContainerStyled>

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
                  value={password.oldPassword}
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
                  size="medium"
                  value={password.newPassword}
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
                  size="medium"
                  value={password.confirmNewPassword}
                  onChange={(event) =>
                    setUserPassword({
                      ...password,
                      confirmNewPassword: event.target.value,
                    })
                  }
                />
              </InputContainer>

              <ButtonsContainer>
                <div style={{ margin: "24px" }}>
                  <Tooltip
                    title="Salvar alteração"
                    placement="top-start"
                    enterDelay={500}
                    leaveDelay={100}
                  >
                    <Button
                      onClick={() => props.saveEditPassword(password)}
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
                </div>
                <div style={{ margin: "24px" }}>
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
                </div>
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
                display: !props.hasEdit && "none",
              }}
              onClick={() => {
                user.name.length > 0 &&
                  user.email.length > 0 &&
                  props.saveEdit(user);
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
              alt={user.name}
              src={user.picture}
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
              value={user.name || "usuario"}
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
              error={!user.name}
              helperText={!user.name ? "Informe o nome!" : " "}
            />
          </InputContainer>

          <InputContainer>
            <TextFieldMask
              disabled={!props.hasEdit}
              label={"Email"}
              fullWidth
              variant={"standard"}
              size="medium"
              value={user.email || "usuario@usuario.com"}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
              error={!user.email}
              helperText={!user.email ? "Informe o email!" : " "}
            />
          </InputContainer>

          <InputContainer>
            <TextFieldMask
              disabled={!props.hasEdit}
              label={"Link de imagem"}
              fullWidth
              variant={"standard"}
              size="medium"
              value={user.picture || "usuario"}
              onChange={(event) =>
                setUser({ ...user, picture: event.target.value })
              }
            />
          </InputContainer>
        </UserAccountCardContainer>
      </ContainerStyled>
    </div>
  );
};
export default UserAccountComponent;
