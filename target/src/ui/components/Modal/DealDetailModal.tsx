import React, { useContext } from "react";

import { Button, IconButton, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import DealDetailCard from "../DealDetailCard/DealDetailCard";
import {
  InputBaseStyled,
  PaperStyled,
} from "../SearchButton/SearchButton.style";
import {
  DealDetailCardContainer,
  PaperDealDetailModalStyled,
} from "../DealDetailCard/DealDetailCard.style";

const DetailModal: React.FC = () => {
  const { dealDetailModalState, useDealDetailModal } =
    useContext(PipelineContext);
  const body = (
    <ModalContainer>
      <CloseButtonStyled onClick={() => {useDealDetailModal('')}}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>
      <Title title={`Detalhes da negociação ${"Google"}`} />
      <DealDetailCard
        company="Google"
        name="Google"
        contact="Google"
        contactEmail="contact@google.com"
        value="985478"
        contactPhone="555-"
        currentResponsible="eu mesmo"
        status="inProgress"
      />
      <br />
      <Title title="Ações" />
      <DealDetailCardContainer>
        <PaperDealDetailModalStyled>
          <TextFieldMask
            label={"Negociação"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={"contact@google.com"}
            disabled
          />
          <IconButton type="submit" aria-label="search">
            <CopyToClipboard text={"contact@google.com"}>
              <i className={`fa fa-clone`}></i>
            </CopyToClipboard>
          </IconButton>
          <IconButton type="submit" aria-label="search">
            <i className={`fa fa-envelope-o`}></i>
          </IconButton>
        </PaperDealDetailModalStyled>

        <PaperDealDetailModalStyled>
          <TextFieldMask
            label={"Negociação"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={"555-"}
            disabled
          />
          <IconButton type="submit" aria-label="search">
            <CopyToClipboard text={"555-"}>
              <i className={`fa fa-clone`}></i>
            </CopyToClipboard>
          </IconButton>
          <IconButton type="submit" aria-label="search">
            <i className={`fa fa-phone`}></i>
          </IconButton>
          <IconButton type="submit" aria-label="search">
            <i className={`fa fa-whatsapp`}></i>
          </IconButton>
        </PaperDealDetailModalStyled>
      </DealDetailCardContainer>
      <br />
      <Title title="Histórico de atividades" />
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={dealDetailModalState}
        onClose={() => useDealDetailModal("")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default DetailModal;
