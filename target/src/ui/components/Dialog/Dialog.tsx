import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HelpOutlineOutlined from "@material-ui/icons/HelpOutlineOutlined";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import React from "react";
import { DialogIconContainer, DialogStyled } from "./Dialog.style";

interface DialogProps {
  title: string;
  message: string;
  type: "question" | "success" | "info";
  open: boolean;
  setOpen: () => void;
  result: (value: boolean) => void;
}
const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  type,
  open,
  setOpen,
  result,
}) => {
  return (
    <DialogStyled open={open}>
      <DialogIconContainer>
        {type === "info" ? (
          <InfoOutlinedIcon fontSize="inherit" color="primary" />
        ) : type === "question" ? (
          <HelpOutlineOutlined fontSize="inherit" color="primary" />
        ) : (
          <CheckCircleOutline fontSize="inherit" color="success" />
        )}
      </DialogIconContainer>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        {type === "question" ? (
          <>
            <Button
              variant="contained"
              color="error"
              type="submit"
              onClick={() => {
                result(false);
                setOpen();
              }}
              autoFocus
            >
              Não
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                result(true);
                setOpen();
              }}
              type="submit"
              sx={{ color: "#fff" }}
            >
              Sim
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => {
              result(false);
              setOpen();
            }}
          >
            Ok
          </Button>
        )}
      </DialogActions>
    </DialogStyled>
  );
};
export default Dialog;
