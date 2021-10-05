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
import DeleteIcon from '@material-ui/icons/Delete';
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import { IContact } from "types/Contact";
import ContactService from "data/services/ContactService";
import { getBrazilianStates, IState } from "data/services/BrazilianStatesApi";

const UpdateContactModal = ({ id }) => {

  const { updateContactModal, useUpdateContactModal } =
    useContext(ContactContext);
  const [states, setStates] = useState<IState[]>([]);

  const [time, setTime] = useState(null);

  const [data, setData] = useState<IContact>({
    name: "",
    company_id: "null",
    state: "null",
    city: "",
    email: "",
    phone: "",
    tag: "null",
  });

  const getSelectedContact = async () => {
    const data = await ContactService.getContact(id);

    const myResponse = {
      ...data,
      company_id: data.company?.id
    }

    console.log(myResponse)

    setData(myResponse)
  }


  useEffect(() => {
    getSelectedContact()
  }, [])

  const getState = async (): Promise<void> => {
    try {
      const response: any = await getBrazilianStates();

      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async () => {
    try {
      if (data.name && data.email && data.company_id) {
        await ContactService.updateContact({
          id,
          name: data?.name,
          email: data?.email,
          phone: data?.phone,
          city: data?.city,
          state: data?.state,
          company_id: data?.company_id,
          tag: data?.tag,
        });

        useUpdateContactModal();
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
          useUpdateContactModal();
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>

      <Title title="Editar contato" />

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
        <MenuItem value={"e05cf55f-5272-41a1-a9c0-ef69c0444b95"}>
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
          <MenuItem value={"null"}>---</MenuItem>
          {states.length > 0
            ? states.map((state) => (
              <MenuItem key={state.id} value={state.sigla}>
                {state.sigla}
              </MenuItem>
            ))
            : null}
        </Select>
      </TwoColumnsContainer>

      <TwoColumnsContainer>

        <Button
          variant="contained"
          color="error"
          onClick={() => updateContact()}
          startIcon={<DeleteIcon />}
          sx={{ mt: 4 }}
        >
          Deletar
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ color: "white" }}
          onClick={() => updateContact()}
          startIcon={<AddCircleIcon />}
          sx={{ mt: 4 }}
        >
          Salvar
        </Button>
      </TwoColumnsContainer>

    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={updateContactModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default UpdateContactModal;