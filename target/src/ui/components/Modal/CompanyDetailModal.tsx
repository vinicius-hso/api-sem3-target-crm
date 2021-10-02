import React, { useContext, useState } from "react";
// import { Button, IconButton } from "@material-ui/core";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
// import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from 'types/Company';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import EditIcon from '@material-ui/icons/Edit';
// import DealDetailCard from '../DealDetailCard/DealDetailCard';
// import { ActionsDealDetailCardContainer } from '../DealDetailCard/DealDetailCard.style';
// import { LinkStyled } from '../Link/Link.style';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import { useCompanyPage } from '../../../data/services/hooks/PageHooks/CompanyHook';


const CompanyDetailModal: React.FC = () => {
  
  const { 
    companyDetailModalState, 
    useCompanyDetailModal, 
    companyDetail, 
    editCompany,
    // useUpdateCompanyModal,
    // company
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

  function handleSubmit() {
    console.log('Aoobah!');
  }

  const body = (

    <ModalContainer>
      {/* {companyDetail.id ? ( */}
        <>
          <CloseButtonStyled
            onClick={() => {
              useCompanyDetailModal(companyDetail);
            }}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </CloseButtonStyled>

          <Title title={`Detalhes da empresa ${companyDetail?.name}`} />

          <CompanyDetailCard
            onClick={() => setHasEdit(!hasEdit)}
            hasEdit={hasEdit}
            // id={companyDetail.id}
            name={companyDetail?.name}
            city={companyDetail?.city}
            state={companyDetail?.state}
            country={companyDetail?.country}
            site={companyDetail?.site}
            picture={companyDetail?.picture}
            saveEdit={(data) => {
              setData(data)
              handleSubmitEdit(data)
            }}
          />
        </>
      {/* // ) : (
      //   <div>Não foi possivel carregar dados, atualize a pagina</div>
      // )} */}
    </ModalContainer>


  );
  return (
    <>
      <ModalStyled
        open={companyDetailModalState}
        onClose={() => useCompanyDetailModal(companyDetail)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CompanyDetailModal;
