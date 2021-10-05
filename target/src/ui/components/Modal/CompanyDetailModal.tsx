import React, { useContext, useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import { useCompanyPage } from "../../../data/services/hooks/PageHooks/CompanyHook";
import { Button } from "@material-ui/core";

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
  const {
    companyDetail,
    editCompany,
    deleteCompany,
  } = useCompanyPage();

  const [hasEdit, setHasEdit] = useState(false);
  /**
   * TODO - useEditCompanyModal, companyDetailCard
   */

  const [data, setData] = useState<CompanyTypes>({
    name: "",
    country: "",
    state: "",
    city: "",
    site: "",
    picture: "",
  });

  const handleSubmitEdit = (data) => {
    editCompany(companyDetail.id, data).then(() => {
      setOpen(false);
      window.location.reload();
    });
    setHasEdit(false);
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
            saveEdit={(data) => {
              setData(data);
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
