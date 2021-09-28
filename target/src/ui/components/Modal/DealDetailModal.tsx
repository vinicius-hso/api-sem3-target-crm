import React, { useContext } from "react";
import { Button, IconButton } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import DealDetailCard from "../DealDetailCard/DealDetailCard";
import {} from "../SearchButton/SearchButton.style";
import { ActionsDealDetailCardContainer } from "../DealDetailCard/DealDetailCard.style";
import Activity from "../Activity/Activity";

const DetailModal: React.FC = () => {
  const { dealDetailModalState, useDealDetailModal } =
    useContext(PipelineContext);
  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useDealDetailModal("");
        }}
      >
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
      <ActionsDealDetailCardContainer>
        <div style={{ display: "flex" }}>
          <TextFieldMask
            label={"Negociação"}
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
        </div>

        <div style={{ display: "flex" }}>
          <TextFieldMask
            label={"Negociação"}
            variant={"standard"}
            size="medium"
            value={"555-"}
            sx={{ width: "45px" }}
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
        </div>
      </ActionsDealDetailCardContainer>
      <br />
      <Title title="Histórico de atividades" />
      <div style={{ position: "relative" }}>
        <Button
          variant="contained"
          sx={{
            width: "150px",
            position: "absolute",
            right: "0",
            top: "-5px",
          }}
          color="primary"
          type="submit"
        >
          Nova atividade
        </Button>
      </div>
      <Activity
        title={"coxinha"}
        tag={"fria"}
        createdAt={"hoje"}
        createdBy={"will"}
        description={
          "Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Per aumento de cachacis, eu reclamis. Atirei o pau no gatis, per gatis num morreus.  Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Per aumento de cachacis, eu reclamis. Atirei o pau no gatis, per gatis num morreus.  "
        }
      />
      <Activity
        title={"coxinha"}
        tag={"fria"}
        createdAt={"hoje"}
        createdBy={"will"}
        description={
          "Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Per aumento de cachacis, eu reclamis. Atirei o pau no gatis, per gatis num morreus.  Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Per aumento de cachacis, eu reclamis. Atirei o pau no gatis, per gatis num morreus.  "
        }
      />
      <Activity
        title={"coxinha"}
        tag={"fria"}
        createdAt={"hoje"}
        createdBy={"will"}
        description={
          "Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Per aumento de cachacis, eu reclamis. Atirei o pau no gatis, per gatis num morreus.  Mussum Ipsum, cacilds vidis litro abertis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Per aumento de cachacis, eu reclamis. Atirei o pau no gatis, per gatis num morreus.  "
        }
      />
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
