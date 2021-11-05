import React, { useContext, useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import { useCompanyPage } from "../../../data/services/hooks/PageHooks/CompanyHook";
import { Button, Tooltip } from "@material-ui/core";
import { StatusTypes } from "types/Status";
import CompanyContext from "contexts/CompanyContext";

interface CompanyDetailModalProps {
  open: boolean;
  company: any;
  setOpen: any;
}

const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  open,
  company,
  setOpen,
}) => {
  const { useDeleteCompanyModal } = useContext(CompanyContext);
  const { editCompany, deleteCompany } = useCompanyPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [status, setStatus] = useState<StatusTypes>({});

  /**
   * TODO - useEditCompanyModal, companyDetailCard
   */

  const handleSubmitEdit = async (data: CompanyTypes) => {
    const res = await editCompany(company.id, data);
    setStatus(res);
    setHasEdit(false);
    setTimeout(() => {
      setStatus({});
    }, 3000);
  };

  const handleDeleteCompany = () => {
    const id = company.id;
    deleteCompany(id).then(() => {
      setOpen(false);
      window.location.reload();
    });
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
            setOpen(false);
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title={`Detalhes da empresa ${company?.name}`} />
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Tooltip
          title="Deletar empresa"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Button
            onClick={() => {
              setOpen(false);
              useDeleteCompanyModal();
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
export default CompanyDetailModal;
