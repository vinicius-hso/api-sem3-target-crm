/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../../Input/TextFieldMask/TextFieldMask";
import Title from "../../Title/Title";
import {
  Button,
  Select,
  MenuItem,
  Tooltip,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import { IContact } from "types/Contact";
import ContactService from "data/services/ContactService";
import CompanyService from "data/services/CompanyService";
import { formatPhone } from "data/utils/formatPhone";
import { mockEstados } from "data/utils/mock";
import { toast } from "react-toastify";
import Dialog from "ui/components/Dialog/Dialog";
import { emailValidator } from "data/utils/emailValidator";

const UpdateContactModal = ({ id, setId, isAdmin, getData }) => {
  const { updateContactModal, useUpdateContactModal, getContacts } =
    useContext(ContactContext);
  const [companies, setCompanies] = useState<CompanyTypes[]>([]);
  const [dialogView, setDialogView] = useState(false);
  const [submited, isSubmited] = useState(false);
  const [data, setData] = useState<IContact>({
    name: "",
    company_id: "",
    state: "",
    city: "",
    email: "",
    phone: "",
    picture: "",
  });

  const mySetId = () => {
    setId();
  };

  const getSelectedContact = async () => {
    const data = await ContactService.getContact(id);

    const myResponse = {
      ...data,
      company_id: data.company?.id,
    };

    setData(myResponse);
  };

  useEffect(() => {
    getSelectedContact();
  }, []);

  const updateContact = async () => {
    if (data.name && emailValidator(data.email) && data.company_id) {
      try {
        await ContactService.updateContact({
          id,
          name: data?.name,
          email: data?.email,
          phone: data?.phone,
          city: data?.city,
          state: data?.state,
          company: data?.company_id,
          picture: data?.picture,
        });

        await getContacts();
        isSubmited(false);
        mySetId();
        useUpdateContactModal();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      isSubmited(true);
      toast.warning(
        "Preenchimento invalido, Verique os campos e tente novamente"
      );
    }
  };

  const getCompanies = async () => {
    const companies = await CompanyService.getCompanies();

    setCompanies(companies);
  };

  useEffect(() => {
    if (!companies.length) getCompanies();
  }, []);

  const body = (
    <ModalContainer>
      <Dialog
        title={"Deletar contato"}
        message={`Tem certeza que deseja deletar ${data?.name}?`}
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await ContactService.deleteContact(id);
            getData();
            useUpdateContactModal();
            mySetId();
          }
        }}
      />

      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            useUpdateContactModal();
            mySetId();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Editar contato" />

      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name || ""}
        label="Nome do contato"
        variant="standard"
        size="small"
        fullWidth
        required
        error={submited && !data.name}
        helperText={submited && !data.name ? "Campo obrigatório" : ""}
      />

      <TextFieldMask
        onChange={(event) => setData({ ...data, email: event.target.value })}
        value={data.email || ""}
        label="Email"
        variant="standard"
        size="small"
        fullWidth
        required
        error={submited && !emailValidator(data.email)}
        helperText={
          submited && !emailValidator(data.email) && "E-mail invalido"
        }
      />

      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, phone: event.target.value })}
          value={formatPhone(data.phone) || ""}
          label="Telefone"
          variant="standard"
          size="small"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={{ mb: -2 }}
            error={submited && !data?.company_id}
          >
            Empresa
          </InputLabel>
          <Select
            onChange={(event) =>
              setData({ ...data, company_id: event.target.value })
            }
            value={data.company_id || ""}
            label="Empresa"
            variant="standard"
            fullWidth
            error={submited && !data?.company_id}
          >
            {companies?.map((company) => (
              <MenuItem value={company.id} key={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
          {submited && !data?.company_id && (
            <Typography variant="caption" color="error">
              Empresa é obrigatória
            </Typography>
          )}
        </FormControl>
      </TwoColumnsContainer>

      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, city: event.target.value })}
          value={data.city}
          label="Cidade"
          variant="standard"
          size="small"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Estado
          </InputLabel>

          <Select
            onChange={(event) =>
              setData({ ...data, state: event.target.value })
            }
            value={data.state || "default"}
            label="Estado"
            variant="standard"
            fullWidth
          >
            <MenuItem value={"default"} disabled>
              Selecione o Estado
            </MenuItem>
            {mockEstados.map((state) => (
              <MenuItem key={state.id} value={state.sigla}>
                {state.sigla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TwoColumnsContainer>

      <TextFieldMask
        onChange={(event) => setData({ ...data, picture: event.target.value })}
        value={data.picture}
        label="Link de imagem"
        variant="standard"
        size="small"
        fullWidth
      />

      {isAdmin ? (
        <TwoColumnsContainer>
          <Tooltip
            title="Deletar contato"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setDialogView(true);
              }}
              startIcon={<DeleteIcon />}
              sx={{ mt: 4 }}
            >
              Deletar
            </Button>
          </Tooltip>

          <Tooltip
            title="Salvar alterações"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="success"
              style={{ color: "white" }}
              onClick={() => {
                updateContact();
              }}
              startIcon={<AddCircleIcon />}
              sx={{ mt: 4 }}
            >
              Salvar
            </Button>
          </Tooltip>
        </TwoColumnsContainer>
      ) : (
        <Tooltip
          title="Salvar alterações"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Button
            variant="contained"
            color="success"
            style={{ color: "white" }}
            onClick={() => {
              updateContact();
            }}
            startIcon={<AddCircleIcon />}
            sx={{ mt: 4 }}
          >
            Salvar
          </Button>
        </Tooltip>
      )}
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={updateContactModal}
        onClose={mySetId}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default UpdateContactModal;
