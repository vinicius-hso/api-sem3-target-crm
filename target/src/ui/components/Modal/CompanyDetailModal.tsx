import React, { useContext, useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from 'types/Company';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';


const CompanyDetailModal: React.FC = () => {
  const { companyDetailModalState, useCompanyDetailModal } = useContext(PipelineContext);

  /**
   * TODO - useEditCompanyModal
   */

  const [data, setData] = useState<CompanyTypes>({
    name: "",
    country: "",
    state: "",
    city: "",
    site: "",
    picture: "",
  });

  function handleSubmit() {
    console.log('Aoobah!');
  }

  const body = (
    <ModalContainer>
        <CloseButtonStyled
        onClick={() => {
            useCompanyDetailModal('');
        }}
        >
        <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>

        <Title title={`Detalhes da ${'EMPRESA'}`} />

        <TextFieldMask
            onChange={(event) => setData({ ...data, name: event.target.value })}
            value={data.name}
            label="Nome da empresa"
            variant="standard"
            size="small"
            fullWidth
            disabled
        />

        <TextFieldMask
            onChange={(event) => setData({ ...data, city: event.target.value })}
            value={data.city}
            label="Cidade"
            variant="standard"
            size="small"
            fullWidth
            disabled
        />

        <TextFieldMask
            onChange={(event) => setData({ ...data, state: event.target.value })}
            value={data.state}
            label="Estado"
            variant="standard"
            size="small"
            fullWidth
            disabled
        />

        <TextFieldMask
            onChange={(event) => setData({ ...data, country: event.target.value })}
            value={data.country}
            label="País"
            variant="standard"
            size="small"
            fullWidth
            disabled
        />

        <TextFieldMask
            onChange={(event) => setData({ ...data, site: event.target.value })}
            value={data.site}
            label="Site"
            variant="standard"
            size="small"
            fullWidth
            disabled
        />

        <TextFieldMask
            onChange={(event) => setData({ ...data, picture: event.target.value })}
            value={data.picture}
            label="Imagem"
            variant="standard"
            size="small"
            fullWidth
            disabled
        />

        <Button
            onClick={() => {
                // useEditCompanyModal()
                useCompanyDetailModal('')
            }}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            sx={{ mt: 4 }}
        >
            Editar
        </Button>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={companyDetailModalState}
        onClose={() => useCompanyDetailModal('')}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CompanyDetailModal;
