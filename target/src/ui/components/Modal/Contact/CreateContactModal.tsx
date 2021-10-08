/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../../Input/TextFieldMask/TextFieldMask";
import Title from "../../Title/Title";
import { Button, Select, MenuItem } from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import { IContact } from "types/Contact";
import ContactService from "data/services/ContactService";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { getBrazilianStates, IState } from "data/services/BrazilianStatesApi";

const CreateContactModal = () => {
  const { createContactModal, useCreateContactModal, getContacts } =
    useContext(ContactContext);
  const [states, setStates] = useState<IState[]>([]);

  const [time, setTime] = useState(null);
  const [data, setData] = useState<IContact>({
    name: "",
    company_id: "null",
    state: "",
    city: "",
    email: "",
    phone: "12000000000",
    tag: "null",
  });

  const getState = async (): Promise<void> => {
    try {
      const response: any = await getBrazilianStates();

      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createContact = async () => {
    try {
      if (data.name && data.email && data.company_id) {
        await ContactService.createContact({
          name: data?.name,
          email: data?.email,
          phone: data?.phone,
          city: data?.city,
          state: data?.state,
          company_id: data?.company_id,
          tag: data?.tag,
        });

        await getContacts()

        useCreateContactModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getState();
  }, []);

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useCreateContactModal();
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>

      <Title title="Adicionar contato" />

      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name}
        label="Nome do contato"
        variant="standard"
        size="small"
        fullWidth
        required
      />

      <Select
        onChange={(event) =>
          setData({ ...data, company_id: event.target.value })
        }
        value={data.company_id}
        label="Empresa"
        variant="standard"
        fullWidth
      >
        <MenuItem value={"null"}>Selecione a Empresa</MenuItem>
        <MenuItem value={"bbcebf0b-917c-4763-b196-9293adfe7cea"}>
          Cluster8
        </MenuItem>
      </Select>

      <TextFieldMask
        onChange={(event) => setData({ ...data, email: event.target.value })}
        value={data.email}
        label="Email"
        variant="standard"
        size="small"
        fullWidth
      />

      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, phone: event.target.value })}
          value={data.phone}
          label="Telefone"
          variant="standard"
          size="small"
          fullWidth
        />

        <Select
          onChange={(event) => setData({ ...data, tag: event.target.value })}
          value={data.tag}
          label="Tag"
          variant="standard"
          fullWidth
        >
          <MenuItem value={"null"}>Selecione a Tag</MenuItem>
          <MenuItem value={"COLD"}>Fria</MenuItem>
          <MenuItem value={"WARM"}>Morna</MenuItem>
          <MenuItem value={"HOT"}>Quente</MenuItem>
        </Select>
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

        <Select
          onChange={(event) => setData({ ...data, state: event.target.value })}
          value={data.state}
          label="Estado"
          variant="standard"
          fullWidth
        >
          <MenuItem value={"null"}>--</MenuItem>
          {states.length > 0
            ? states.map((state) => (
              <MenuItem key={state.id} value={state.sigla}>
                {state.sigla}
              </MenuItem>
            ))
            : null}
        </Select>
      </TwoColumnsContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={() => createContact()}
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
        open={createContactModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default CreateContactModal;
