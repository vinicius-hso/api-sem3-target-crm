import React, { useEffect, useState } from "react";
import Title from "../../Title/Title";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { ModalContainer } from "./../ModalStyles/ModalContainer.style";
import { ModalStyled } from "./../ModalStyles/Modal.style";
import { CloseButtonStyled } from "./../ModalStyles/CloseButtonModal.style";
import { DealTypes } from "types/Deal";
import { ButtonsContainer } from "../ModalStyles/ButtonsContainer";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { useDealPage } from "data/services/hooks/PageHooks/DealHook";
import { StatusTypes } from "types/Status";
import { useNavBarComponent } from "data/services/hooks/componentHooks/NavHook";
import { formatValue } from "data/utils/formatValue";
import Dialog from "ui/components/Dialog/Dialog";
import DealsService from "data/services/DealsService";

interface AchivedDealModalProps {
  deal: DealTypes;
  setOpen: (value: boolean) => void;
  open: boolean;
  setStatus: (value: StatusTypes) => void;
  getDealsData: () => void;
}

const AchivedDealModal: React.FC<AchivedDealModalProps> = ({
  deal,
  setOpen,
  open,
  setStatus,
  getDealsData,
}) => {
  const [hasRestore, setHasRestore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [dialogView, setDialogView] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState("default");
  const { pipelines, getData } = usePipelineComponent();
  const { updateStatusAndRestore } = useDealPage();
  const { isAdmin } = useNavBarComponent();

  useEffect(() => {
    if (!pipelines.length) {
      getData();
    }
  }, []);

  const handleDelete = async () => {
    await DealsService.deletedDeal(deal.id);
    getDealsData();
    onClose();
  };

  const onClose = () => {
    setHasRestore(false);
    setSelectedPipeline("default");
    setOpen(false);
  };

  const body = (
    <ModalContainer>
      <Dialog
        title={"Deletar negociação"}
        message={`Tem certeza que deseja deletar ${deal.name}?`}
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            handleDelete();
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

      <Title title={`Ações para ${deal.name}`} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
          boxShadow: "0 0 5px rgba(0,0,0,.2)",
          height: "50px",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <Typography variant="body2">{deal.company?.name}</Typography>
        <Typography variant="body2">{deal.contact?.name}</Typography>
        <Typography variant="body2">{formatValue(deal?.value)}</Typography>
        {!hasRestore ? (
          <div>
            <Tooltip
              title="Restaurar negociação"
              placement="top-start"
              enterDelay={500}
              leaveDelay={100}
            >
              <Button
                sx={{ minWidth: 0, width: 4, mr: "2px" }}
                variant="contained"
                color="secondary"
                onClick={() => setHasRestore(true)}
              >
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </Button>
            </Tooltip>

            {isAdmin ? (
              <Tooltip
                title="Deletar negociação"
                placement="top-start"
                enterDelay={500}
                leaveDelay={100}
              >
                <Button
                  sx={{ minWidth: 0, width: 4 }}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDialogView(true);
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </Button>
              </Tooltip>
            ) : null}
          </div>
        ) : null}
      </div>
      {hasRestore ? (
        <>
          <FormControl sx={{ mt: 4 }} fullWidth>
            <InputLabel
              error={hasError}
              variant="standard"
              htmlFor="uncontrolled-native"
            >
              Pipeline
            </InputLabel>
            <Select
              value={selectedPipeline}
              onChange={(event) => {
                if (
                  event.target.value.length &&
                  event.target.value !== "default"
                ) {
                  setHasError(false);
                }
                setSelectedPipeline(event.target.value);
              }}
              variant="standard"
              size="medium"
              fullWidth
              error={hasError}
            >
              <MenuItem value={"default"}>Selecione um pipeline</MenuItem>
              {pipelines.map((pipeline) => (
                <MenuItem key={pipeline.id} value={pipeline.id}>
                  {pipeline.name}
                </MenuItem>
              ))}
            </Select>
            {hasError ? (
              <Typography variant="caption" color="error">
                Pipeline é obrigatorio
              </Typography>
            ) : null}
          </FormControl>
          <ButtonsContainer>
            <Button
              onClick={async () => {
                if (selectedPipeline.length && selectedPipeline !== "default") {
                  setStatus(
                    await updateStatusAndRestore(deal.id, selectedPipeline)
                  );
                  onClose();
                }
              }}
              variant="contained"
              color="primary"
              startIcon={<i className="fa fa-pensil"></i>}
              sx={{ mt: 2 }}
            >
              Restaurar
            </Button>
            <Button
              onClick={() => {
                setHasRestore(false);
                setSelectedPipeline("default");
                setHasError(false);
              }}
              variant="contained"
              color="error"
              startIcon={<i className="fa fa-pensil"></i>}
              sx={{ mt: 2 }}
            >
              Cancelar
            </Button>
          </ButtonsContainer>
        </>
      ) : null}
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
export default AchivedDealModal;
