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
} from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import { IContact } from "types/Contact";
import ContactService from "data/services/ContactService";
import CompanyService from "data/services/CompanyService";
import { formatPhone } from "data/utils/formatPhone";
import { mockEstados } from "data/utils/mock";

const CreateContactModal = () => {
  const { createContactModal, useCreateContactModal, getContacts } =
    useContext(ContactContext);
  const [companies, setCompanies] = useState<CompanyTypes[]>([]);

  const [submited, isSubmited] = useState(false);
  const [data, setData] = useState<IContact>({
    name: "",
    company_id: "null",
    state: "null",
    city: "",
    email: "",
    phone: "",
  });

  const createContact = async () => {
    isSubmited(true);
    try {
      if (data.name && data.email && data.company_id) {
        await ContactService.createContact({
          name: data?.name,
          email: data?.email,
          phone: data?.phone,
          city: data?.city,
          state: data?.state,
          company: data?.company_id,
        });

        await getContacts();
        onClose();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function getCompanies() {
    const companies = await CompanyService.getCompanies();
    setCompanies(companies);
  }

  useEffect(() => {
    if (!companies.length) getCompanies();
    isSubmited(false);
    setData({
      name: "",
      company_id: "null",
      state: "null",
      city: "",
      email: "",
      phone: "",
    });
  }, []);

  const onClose = () => {
    setData({
      name: "",
      company_id: "null",
      state: "null",
      city: "",
      email: "",
      phone: "",
    });
    useCreateContactModal();
  };

  const body = (
    <ModalContainer>
      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            onClose();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Adicionar contato" />

      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name}
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
        value={data.email}
        label="Email"
        variant="standard"
        size="small"
        fullWidth
        required
        error={submited && !data.email}
        helperText={submited && !data.email ? "Campo obrigatório" : ""}
      />

      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, phone: event.target.value })}
          value={formatPhone(data.phone)}
          label="Telefone"
          variant="standard"
          size="small"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Empresa
          </InputLabel>
          <Select
            onChange={(event) =>
              setData({ ...data, company_id: event.target.value })
            }
            value={data.company_id}
            label="Empresa"
            variant="standard"
            fullWidth
          >
            <MenuItem value={"null"} disabled>
              Selecione a Empresa
            </MenuItem>
            {companies?.map((company) => (
              <MenuItem value={company.id} key={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
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
            value={data.state}
            label="Estado"
            variant="standard"
            fullWidth
          >
            <MenuItem value={"null"} disabled>
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
      <Tooltip
        title="Adicionar contato"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => createContact()}
          startIcon={<AddCircleIcon />}
          sx={{ mt: 4 }}
        >
          Adicionar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={createContactModal}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default CreateContactModal;
