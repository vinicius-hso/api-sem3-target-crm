import React, { useState } from "react";
import Title from "../../Title/Title";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { ModalContainer } from "./../ModalStyles/ModalContainer.style";
import { ModalStyled } from "./../ModalStyles/Modal.style";
import { CloseButtonStyled } from "./../ModalStyles/CloseButtonModal.style";
import { DealTypes } from "types/Deal";
import { ButtonsContainer } from "../ModalStyles/ButtonsContainer";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { useDealPage } from "data/services/hooks/PageHooks/DealHook";
import { StatusTypes } from "types/Status";
import { useNavBarComponent } from "data/services/hooks/componentHooks/NavBarHook";
import { formatValue } from "data/utils/formatValue";

interface AchivedDealModalProps {
  deal: DealTypes;
  setOpen: (value: boolean) => void;
  open: boolean;
  setStatus: (value: StatusTypes) => void;
}

const AchivedDealModal: React.FC<AchivedDealModalProps> = ({
  deal,
  setOpen,
  open,
  setStatus,
}) => {
  const [hasRestore, setHasRestore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState("default");
  const { pipelines } = usePipelineComponent();
  const { updateStatusAndRestore } = useDealPage();
  const { isAdmin } = useNavBarComponent();

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          setOpen(false);
          setHasRestore(false);
          setSelectedPipeline("default");
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>

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
            <Button
              sx={{ minWidth: 0, width: 4, mr: "2px" }}
              variant="contained"
              color="secondary"
              onClick={() => setHasRestore(true)}
            >
              <i className="fa fa-refresh" aria-hidden="true"></i>
            </Button>
            {isAdmin ? (
              <Button
                sx={{ minWidth: 0, width: 4 }}
                variant="contained"
                color="error"
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
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
                  setHasRestore(false);
                  setSelectedPipeline("default");
                  setOpen(false);
                } else {
                  setHasError(true);
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
          setOpen(false);
          setHasRestore(false);
          setSelectedPipeline("default");
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
