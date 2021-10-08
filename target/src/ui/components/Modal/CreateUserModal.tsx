import React, { useState, useContext } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Title from "../Title/Title";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { IUser } from "types/User";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "./ModalStyles/Modal.style";

interface CreateUserModalProps {
  open: boolean;
  setOpen: any;
}
const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, setOpen }) => {
  const { createUserModalState, useCreateUserModal, createUser } =
    useUserPage();

  // const { createCompanyModalState, useCreateCompanyModal, createCompany } =
  //   useContext(PipelineContext);
  const [submit, setSubmit] = useState(false);
  const [time, setTime] = useState(null);
  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    role: "",
    picture: "",
  });

  async function handleSubmit() {
    setSubmit(true);
    (data.name && data.email? createUser(data).then(() => window.location.reload()): null)

  }

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          setOpen(false);
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>

      <Title title="Novo usuário" />
      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome"
          variant="standard"
          size="small"
          fullWidth
          required
          error={submit && !data.name}
          helperText={!data.name && submit ? 'Nome é obrigatório' : ' '}
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, email: event.target.value })}
          value={data.email}
          label="Email"
          variant="standard"
          size="small"
          fullWidth
          required
          error={submit && !data.email}
          helperText={!data.email && submit ? 'Email é obrigatório' : ' '}
        />

        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Perfil
          </InputLabel>
          <Select
            onChange={(event) => setData({ ...data, role: event.target.value })}
            value={data.role}
            variant="standard"
            size="medium"
            fullWidth
            defaultValue={""}

          >
            <MenuItem value={"ADMIN"}>Administrador</MenuItem>
            <MenuItem value={"SELLER"}>Vendedor</MenuItem>
          </Select>
        </FormControl>

        <TextFieldMask
          onChange={(event) =>
            setData({ ...data, picture: event.target.value })
          }
          value={data.picture}
          label="Link da imagem"
          variant="standard"
          size="small"
          fullWidth
        />
      </TwoColumnsContainer>

      <Button
        onClick={() => handleSubmit()}
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        sx={{ mt: 4 }}
      >
        Adicionar
      </Button>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default CreateUserModal;
