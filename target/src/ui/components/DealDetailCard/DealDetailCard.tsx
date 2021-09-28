import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { ThreeColumnsContainer } from "../Modal/ModalStyles/ModalContainer.style";
import {
  DealDetailCardContainer,
  EditButton,
  InputContainer,
} from "./DealDetailCard.style";

//@deprecated
interface DealDetailCardProps {
  company: string;
  contact: string;
  name: string;
  value: string;
  status: string;
  contactEmail: string;
  contactPhone: string;
  currentResponsible: string;
}

const DealDetailCard: React.FC<DealDetailCardProps> = (props) => {
  return (
    <DealDetailCardContainer>
      <EditButton>
        Editar
        <i
          style={{ marginLeft: "2px" }}
          className="fa fa-pencil"
          aria-hidden="true"
        ></i>
      </EditButton>
      <InputContainer>
        <FormControl fullWidth>
          <TextFieldMask
            disabled
            label={"Negociação"}
            variant={"standard"}
            size="medium"
            fullWidth
            value={props.name}
            sx={{ mt: "16px" }}
          />
        </FormControl>
      </InputContainer>
      <InputContainer>
        <div>
          <Typography color="lightgrey" variant="caption">
            Empresa
          </Typography>
          <Select
            disabled
            onChange={() => {}}
            value={props.company}
            label="Empresa"
            variant="standard"
            fullWidth
          >
            <MenuItem value={props.company}>{props.company}</MenuItem>
            <MenuItem value={"bbcebf0b-917c-4763-b196-9293adfe7cea"}>
              Empresa
            </MenuItem>
          </Select>
        </div>
      </InputContainer>
      <InputContainer>
        <div>
          <Typography color="lightgrey" variant="caption">
            Contato
          </Typography>
          <Select
            disabled
            onChange={(event) => {}}
            label="Contato"
            value={props.contact}
            variant="standard"
            fullWidth
          >
            <MenuItem value={props.contact}>{props.contact}</MenuItem>
            <MenuItem value={"e0566909-9ae7-46e5-8b65-a5ca133a137d"}>
              Contato
            </MenuItem>
          </Select>
        </div>
      </InputContainer>
      <InputContainer>
        <TextFieldMask
          disabled
          label={"Valor"}
          fullWidth
          variant={"standard"}
          size="medium"
          value={props.value}
        />
      </InputContainer>
      <InputContainer>
        <TextFieldMask
          disabled
          label={"Responsavel"}
          fullWidth
          variant={"standard"}
          size="medium"
          value={props.currentResponsible}
        />
      </InputContainer>
      <InputContainer>
        <TextFieldMask
          disabled
          label={"Status"}
          fullWidth
          variant={"standard"}
          size="medium"
          value={props.status}
        />
      </InputContainer>
    </DealDetailCardContainer>
  );
};
export default DealDetailCard;