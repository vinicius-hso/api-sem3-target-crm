import React, { useContext, useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import { useCompanyPage } from "../../../data/services/hooks/PageHooks/CompanyHook";
import { Button } from "@material-ui/core";
import Alert from "../AlertComponent/AlertComponent";
import { StatusTypes } from "types/Status";

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
      {company.id ? (
        <>
          {status.type ? (
            <Alert
              title={status.title}
              severity={status.type}
              message={status.message}
            />
          ) : null}

          <CloseButtonStyled
            onClick={() => {
              setOpen(false);
            }}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </CloseButtonStyled>

          <Title title={`Detalhes da empresa ${company?.name}`} />
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button
              onClick={() => {
                handleDeleteCompany();
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
        </>
      ) : (
        <div>Não foi possivel carregar dados, atualize a pagina</div>
      )}
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
