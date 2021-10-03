import React, { useContext, useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import { useCompanyPage } from "../../../data/services/hooks/PageHooks/companyHook";
import { useEffect } from "react";
import { Button } from "@material-ui/core";

interface CompanyDetailModalProps {
  open: boolean;
  company: any;
}

const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  open,
  company,
}) => {
  const {
    companyDetailModalState,
    useCompanyDetailModal,
    companyDetail,
    editCompany,
    deleteCompany,
    // useUpdateCompanyModal,
    // company
    openCompanyModalState,
    setOpenCompanyModalState,
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
    editCompany(companyDetail.id, data);
    setHasEdit(false);
  };

  const handleDeleteCompany = () => {
    const id = company.id;
    deleteCompany(id).then(() => {
      window.location.reload();
    });
  };

  // function handleSubmit() {
  //   console.log("Aoobah!");
  // }

  const body = (
    <ModalContainer>
      {company.id ? (
        <>
          <CloseButtonStyled
            onClick={() => {
              // console.log('>>>>');
              // useCompanyDetailModal(companyDetail)
              setOpenCompanyModalState(false);
              console.log("COMPANY -->", company.id);
            }}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </CloseButtonStyled>

          <Title title={`Detalhes da empresa ${company?.name}`} />
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button
              onClick={() => {
                // updateStatus(dealDetail.id, { status: "ARCHIVED" });
                // setHasStatusChange(false);
                handleDeleteCompany();
                // window.location.reload();
              }}
              variant="contained"
              size="small"
              sx={{
                width: "160px",
                mb: 2,
              }}
              color="secondary"
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
          open = false;
          setOpenCompanyModalState(false);
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
