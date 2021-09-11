import React from "react";
import ScrumBoard from "data/services/servicesComponents/ScrumBoard";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { Button, CircularProgress, Typography, Modal } from "@material-ui/core";
import {
  DealsHeaderContainer,
  DealsPageContainer,
  DealsTotalTagsContainer,
  PipelinesContainer,
} from "@styles/pagesStyle/deals.style";
import Title from "ui/components/Title/Title";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";

function DealPipeline() {
  const { hasError, isLoading } = usePipelineComponent();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const styles = {
    box: {
      backgroundColor: "#fff",
      height: "180px",
      width: "450px",
      borderRadius: "10px",
      padding: "15px",
    },
    title: { color: "#E2711D" },
    body: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textBold: {
      fontWeight: "bold",
      margin: 0,
      fontSize: "17px",
    },
    textBody: {
      fontSize: "15px",
      fontWeight: "normal",
      margin: 0,
    },
    button: {
      margin: "20px",
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const body = (
    <div style={styles.box}>
      <h2 style={styles.title} id="simple-modal-title">
        Deletar Pipeline
      </h2>

      <div style={styles.body}>
        <p style={styles.textBold}>
          Tem certeza que deseja deletar esse pipeline?
        </p>

        <h4 style={styles.textBody}>
          Todos as negociações do pipeline serão arquivadas
        </h4>
        <Button style={styles.button} variant="contained" color="error">
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <DealsPageContainer>
      <Modal
        style={styles.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <DealsHeaderContainer>
        <div>
          <Title
            title="PIPELINE"
            subtitle={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Typography>R$ 12.257,75</Typography>
                <i
                  className="fa fa-arrow-right"
                  style={{ position: "relative", top: "2px" }}
                ></i>
                <Typography>8 negociações</Typography>
              </div>
            }
          ></Title>
          <DealsTotalTagsContainer>
            <div>
              <i className="fa fa-fire" style={{ color: "#e63706" }}></i>
              <span> 5</span>
            </div>
            <div>
              <i className="fa fa-bolt" style={{ color: "#effa5c" }}></i>
              <span> 4</span>
            </div>
            <div>
              <i className="fa fa-snowflake-o" style={{ color: "#3eccf0" }}></i>
              <span> 2</span>
            </div>
          </DealsTotalTagsContainer>
        </div>
        <TextFieldMask
          fullWidth
          label={"Buscar"}
          variant={"outlined"}
          icon="fa fa-search"
          type="text"
          size="small"
          value=""
          onChange={(event) => {}}
        ></TextFieldMask>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {}}
          type="submit"
          sx={{ height: "40px", margin: "auto" }}
          startIcon={<i className="fa fa-archive"></i>}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Aquivados"
          )}
        </Button>
      </DealsHeaderContainer>
      <PipelinesContainer>
        {isLoading ? (
          <CircularProgress />
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <ScrumBoard />
        )}
      </PipelinesContainer>
    </DealsPageContainer>
  );
}

export default DealPipeline;
