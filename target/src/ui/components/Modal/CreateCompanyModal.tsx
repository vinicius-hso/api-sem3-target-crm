import React, { useState, useContext } from "react";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Title from "../Title/Title";
import { useCompanyPage } from "data/services/hooks/PageHooks/companyHook";
import { Button } from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "./ModalStyles/Modal.style";
import PipelineContext from "contexts/PipelineContext";

const CreateCompanyModal = () => {
  const { createCompanyModalState, useCreateCompanyModal, createCompany } =
    useContext(PipelineContext);

  const [data, setData] = useState<CompanyTypes>({
    name: "",
    country: "",
    state: "",
    city: "",
    site: "",
    picture: "",
  });

  async function handleSubmit() {
    createCompany(data);
  }

  // createCompanyModalState,

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useCreateCompanyModal();
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>

      <Title title="Nova empresa" />

      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name}
        label="Nome da empresa"
        variant="standard"
        size="small"
        fullWidth
      />

      <TextFieldMask
        onChange={(event) => setData({ ...data, city: event.target.value })}
        value={data.city}
        label="Cidade"
        variant="standard"
        size="small"
        fullWidth
      />

      <TextFieldMask
        onChange={(event) => setData({ ...data, state: event.target.value })}
        value={data.state}
        label="Estado"
        variant="standard"
        size="small"
        fullWidth
      />

      <TextFieldMask
        onChange={(event) => setData({ ...data, country: event.target.value })}
        value={data.country}
        label="País"
        variant="standard"
        size="small"
        fullWidth
      />

      <TextFieldMask
        onChange={(event) => setData({ ...data, site: event.target.value })}
        value={data.site}
        label="Site"
        variant="standard"
        size="small"
        fullWidth
      />

      <TextFieldMask
        onChange={(event) => setData({ ...data, picture: event.target.value })}
        value={data.picture}
        label="Imagem"
        variant="standard"
        size="small"
        fullWidth
      />

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
        open={createCompanyModalState}
        onClose={() => useCreateCompanyModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default CreateCompanyModal;