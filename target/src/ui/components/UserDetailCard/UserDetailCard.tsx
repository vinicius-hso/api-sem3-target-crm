import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputLabel,
  useTheme,
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
  // const { formatCompaniesToSelect } = useCompanyPage();
  // const { formatListThisCompanyToSelect } = useContactPage();
  // const [contactsThisCompany, setContactsThisCompany] = useState([]);

  //   const [selectedContact, setSelectedContact] = useState(props.contact);
  //   const [selectedCompany, setSelectedCompany] = useState(props.company);

  const { editUser } = useUserPage();

  const [isInitialValue, setInitialValue] = useState(true);

  const [value, setValue] = useState();

  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [role, setRole] = useState(props.role);
  const [picture, setPicture] = useState(props.picture);

  const [error, setError] = useState(false);
  const theme = useTheme();
  const handleSubmit = () => {
    const id = props.id;
    const data = {
      name,
      email,
      role,
      picture,
    };
    editUser(id, data).then(() => {
      window.location.reload();
    });
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

      <UserDetailCardContainer>
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
            value={value}
            onChange={(event) => setName(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Email"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.email}
            value={value}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Imagem"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={props.picture}
            value={value}
            onChange={(event) => setPicture(event.target.value)}
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
            defaultValue={props.role}
            value={value}
            onChange={(event) => setRole(event.target.value)}
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
