import React, { useState } from "react";
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
import Theme from "ui/theme/theme";
import TextField from "@material-ui/core/TextField";
import GetAppIcon from "@material-ui/icons/GetApp";

function DealPipeline() {
  const { hasError, isLoading } = usePipelineComponent();
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const styles = {
    box: {
      backgroundColor: "#fff",
      width: "450px",
      height: "180px",
      padding: "15px",
      borderRadius: "8px"
    },
    body: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      display: "flex",
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

    },
    title: {
      fontWeight: "bold",
      color: Theme.palette.primary.main,
    },
    button:{
      color:"#fff",
      margin: "20px"
    }
  };
  const body = (
    <div style={styles.box}>
      <h2 style={styles.title} id="simple-modal-title">
        Editar pipeline
      </h2>
      <div style={styles.body}>
        <TextField id="outlined-basic" label="Nome do pipeline" variant="outlined" size="small" fullWidth />
        <Button variant="contained" color="success" style={styles.button} startIcon={<GetAppIcon/>}>
          Enviar
        </Button>
      </div>
    </div>
  );
  return (
    <DealsPageContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={styles.modal}
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
