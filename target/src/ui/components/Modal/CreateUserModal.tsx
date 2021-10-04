import React, { useState, useContext } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Title from "../Title/Title";
// import { useCompanyPage } from "data/services/hooks/PageHooks/companyHook";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";
import { Button, useForkRef } from "@material-ui/core";
import { IUser } from "types/User";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "./ModalStyles/Modal.style";
// import PipelineContext from 'contexts/PipelineContext';
import PipelineContext from "contexts/PipelineContext";

interface CreateUserModalProps {
  open: boolean;
  setOpen: any;
}
const CreateUserModal: React.FC<CreateUserModalProps> = ({
   open,
   setOpen,
  }) => {
  const { createUserModalState, useCreateUserModal, createUser } =
    useUserPage();

  // const { createCompanyModalState, useCreateCompanyModal, createCompany } =
  //   useContext(PipelineContext);

  const [time, setTime] = useState(null);
  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    password:"",
    role: "",
    picture: ""
  });

  async function handleSubmit() {
    createUser(data).then(() => window.location.reload());
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

      <Title title="Novo usuario" />
      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome"
          variant="standard"
          size="small"
          fullWidth
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, role: event.target.value })}
          value={data.role}
          label="Role"
          variant="standard"
          size="small"
          fullWidth
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, email: event.target.value })}
          value={data.email}
          label="email"
          variant="standard"
          size="small"
          fullWidth
        />

        <TextFieldMask
          onChange={(event) =>
            setData({ ...data, password: event.target.value })
          }
          value={data.password}
          label="password"
          variant="standard"
          size="small"
          fullWidth
        />
        <TextFieldMask
          onChange={(event) =>
            setData({ ...data, picture: event.target.value })
          }
          value={data.picture}
          label="Link de imagem"
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
