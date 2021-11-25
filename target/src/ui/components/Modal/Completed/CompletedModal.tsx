import React, { useEffect, useState } from "react";
import Title from "../../Title/Title";
import { Typography, Tooltip } from "@material-ui/core";
import { ModalContainer } from "./../ModalStyles/ModalContainer.style";
import { ModalStyled } from "./../ModalStyles/Modal.style";
import { CloseButtonStyled } from "./../ModalStyles/CloseButtonModal.style";
import { InfoContainer } from "./../ModalStyles/CompletedModal.style";
import { DealTypes } from "types/Deal";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { StatusTypes } from "types/Status";
import { useNavBarComponent } from "data/services/hooks/componentHooks/NavHook";
import { formatValue } from "data/utils/formatValue";
import Activity from "../../Activity/Activity";
import { width } from "@material-ui/system";

interface CompletedDealModalProps {
  deal: DealTypes;
  setOpen: (value: boolean) => void;
  open: boolean;
  setStatus: (value: StatusTypes) => void;
  finishedBy: string;
}

const CompletedDealModal: React.FC<CompletedDealModalProps> = ({
  deal,
  setOpen,
  open,
  finishedBy,
}) => {
  const { pipelines, getData } = usePipelineComponent();

  useEffect(() => {
    if (!pipelines.length) {
      getData();
    }
  }, []);

  const onClose = () => {
    setOpen(false);
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
            onClose();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title={`Detalhes de ${deal.name}`} />
      <InfoContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "auto",
            padding: "10px",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Empresa:
            </Typography>
            <Typography variant="body2">{deal.company?.name}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Contato:
            </Typography>
            <Typography variant="body2">{deal.contact?.name}</Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "20px",
            padding: "10px",

            height: "auto",
            borderRadius: "4px",

            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Valor:
            </Typography>
            <Typography variant="body2">{formatValue(deal?.value)}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexDirection: "column",
              height: "80px",
              minWidth: "150px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2" color="primary">
              Finalizada por:
            </Typography>
            <Typography variant="body2">{finishedBy}</Typography>
          </div>
        </div>
      </InfoContainer>

      <div
        style={{
          margin: "16px",
          padding: "8px",
        }}
      >
        <Title title={`Histórico de atividades`} />
        {deal.activity
          ? deal.activity
              .sort((a, b) =>
                a.createdAt < b.createdAt
                  ? 1
                  : a.createdAt > b.createdAt
                  ? -1
                  : 0
              )
              .map((act) => (
                <Activity
                  key={act.createdAt}
                  title={act.name}
                  tag={act.tag}
                  createdAt={act.createdAt}
                  createdBy={act.createdBy.name}
                  description={act.description}
                />
              ))
          : null}
      </div>
    </ModalContainer>
  );
  return (
    <>
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
    </>
  );
};
export default CompletedDealModal;
