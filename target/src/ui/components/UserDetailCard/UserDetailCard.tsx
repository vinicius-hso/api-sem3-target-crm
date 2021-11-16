import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputLabel,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import React, { useContext, useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  UserDetailCardContainer,
  EditButton,
  InputContainer,
} from "./UserDetailCard.style";
import { IUser } from "types/User";
import theme from "ui/theme/theme";

//@deprecated
interface UserDetailCardProps {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const DealDetailCard: React.FC<UserDetailCardProps> = (props) => {
  const [data, setData] = useState<IUser>({
    name: props.name,
    email: props.email,
    role: props.role,
    picture: props.picture,
  });

  return (
    <div>
      <Typography
        sx={{
          position: "relative",
          top: "20px",
          left: "15px",
          zIndex: 1,
          display: "none",
        }}
        color="error"
        variant="caption"
      >
        <i className="fa fa-info-circle" /> Formulario incompleto
      </Typography>

      <UserDetailCardContainer>
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
              display: props.hasEdit ? "inline" : "none",
            }}
            onClick={() => props.saveEdit(data)}
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
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Nome"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Email"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={data.email}
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Link da Imagem"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={data.picture}
            onChange={(event) =>
              setData({ ...data, picture: event.target.value })
            }
          />
        </InputContainer>

        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: props.hasEdit
                ? theme.palette.text.secondary
                : theme.palette.text.disabled,
            }}
            variant="standard"
            htmlFor="uncontrolled-native"
          >
            Perfil
          </InputLabel>
          <Select
            disabled={!props.hasEdit}
            value={data.role}
            onChange={(event) => setData({ ...data, role: event.target.value })}
            label={"Role"}
            variant="standard"
            size="medium"
            fullWidth
          >
            <MenuItem value={"ADMIN"}>Administrador</MenuItem>
            <MenuItem value={"SELLER"}>Vendedor</MenuItem>
          </Select>
        </FormControl>
      </UserDetailCardContainer>
    </div>
  );
};
export default DealDetailCard;
