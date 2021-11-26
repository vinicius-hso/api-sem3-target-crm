import React, { useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import { useCompanyPage } from "../../../data/services/hooks/PageHooks/CompanyHook";
import { Button, Tooltip } from "@material-ui/core";
import Dialog from "../Dialog/Dialog";

interface CompanyDetailModalProps {
  open: boolean;
  company: any;
  setOpen: any;
  getData: () => void;
  isAdmin: boolean;
}

const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  open,
  company,
  setOpen,
  getData,
  isAdmin,
}) => {
  const { editCompany, deleteCompany } = useCompanyPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [dialogView, setDialogView] = useState(false);

  const handleSubmitEdit = async (data: CompanyTypes) => {
    await editCompany(company.id, data);
    getData();
    onClose();
  };

  const onClose = () => {
    setHasEdit(false);
    setOpen(false);
  };

  const body = (
    <ModalContainer>
      <Dialog
        title={"Deletar empresa"}
        message={
          <>
            <span style={{ display: "block" }}>
              Ao deletar uma empresa, os dados de contatos e negociações
              vinculados a está empresa também serão apagados
            </span>
            <span>Tem certeza que deseja deletar {company?.name}?</span>
          </>
        }
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await deleteCompany(company.id);
            getData();
            onClose();
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
            onClose();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title={`Detalhes da empresa ${company?.name}`} />
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Tooltip
            title="Deletar empresa"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              onClick={() => {
                setDialogView(true);
              }}
              variant="contained"
              size="small"
              sx={{
                width: "160px",
                mb: 2,
              }}
              color="error"
              type="submit"
            >
              Deletar
            </Button>
          </Tooltip>
        </div>
      )}

      <CompanyDetailCard
        onClick={() => setHasEdit(!hasEdit)}
        hasEdit={hasEdit}
        id={company.id}
        name={company?.name}
        city={company?.city}
        state={company?.state}
        country={company?.country}
        site={company?.site}
        picture={company?.picture}
        saveEdit={(data: CompanyTypes) => {
          handleSubmitEdit(data);
        }}
      />
    </ModalContainer>
  );
  return (
    <ModalStyled
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </ModalStyled>
  );
};
export default CompanyDetailModal;
