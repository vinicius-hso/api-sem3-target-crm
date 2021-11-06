import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Tooltip,
  InputLabel,
} from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import React, { useContext, useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import PipelineContext from "contexts/PipelineContext";
import {
  CompanyDetailCardContainer,
  EditButton,
  InputContainer,
} from "./CompanyDetailCard.style";
import { CompanyTypes } from "types/Company";
import theme from "ui/theme/theme";
import { mockEstados } from "data/utils/mock";

//@deprecated
interface CompanyDetailCardProps {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  site: string;
  picture: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const DealDetailCard: React.FC<CompanyDetailCardProps> = (props) => {
  const [data, setData] = useState<CompanyTypes>({
    name: props.name,
    city: props.city,
    state: props.state,
    country: props.country,
    site: props.site,
    picture: props.picture,
  });
  
  return (
    <div>
      <Typography
        sx={{
          position: "relative",
          top: "20px",
          left: "15px",
          zIndex: 1,
          display: "none",
        }}
        color="error"
        variant="caption"
      >
        <i className="fa fa-info-circle" /> Formulario incompleto
      </Typography>

      <CompanyDetailCardContainer>
        {!props.hasEdit ? (
          <Tooltip
            title="Editar"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <EditButton
              style={{ right: props.hasEdit ? "80px" : 0 }}
              onClick={props.onClick}
            >
              {!props.hasEdit ? "Editar" : "Cancelar"}
              <i
                style={{ marginLeft: "2px" }}
                className={`fa fa-${!props.hasEdit ? "pencil" : "times"}`}
                aria-hidden="true"
              ></i>
            </EditButton>
          </Tooltip>
        ) : (
          <Tooltip
            title="Cancelar"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <EditButton
              style={{ right: props.hasEdit ? "80px" : 0 }}
              onClick={props.onClick}
              color={props.hasEdit ? "error" : "primary"}
            >
              {!props.hasEdit ? "Editar" : "Cancelar"}
              <i
                style={{ marginLeft: "2px" }}
                className={`fa fa-${!props.hasEdit ? "pencil" : "times"}`}
                aria-hidden="true"
              ></i>
            </EditButton>
          </Tooltip>
        )}

        <Tooltip
          title="Salvar alterações"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <EditButton
            style={{
              display: props.hasEdit ? "inline" : "none",
            }}
            onClick={() => props.saveEdit(data)}
            color={props.hasEdit ? "success" : "primary"}
          >
            {"Salvar"}
            <i
              style={{ marginLeft: "2px" }}
              className="fa fa-check"
              aria-hidden="true"
            ></i>
          </EditButton>
        </Tooltip>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Nome"}
            fullWidth
            variant={"standard"}
            size="medium"
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
            error={!data.name}
            helperText={!data.name ? "Nome é obrigatório" : " "}
          />
        </InputContainer>

        <InputContainer style = {{marginBottom:"22px"}}>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Cidade"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={data.city}
            onChange={(event) => setData({ ...data, city: event.target.value })}            
          />
        </InputContainer>

        <FormControl fullWidth style = {{marginBottom:"22px"}}>
          <InputLabel
          sx={{
            color: props.hasEdit
              ? theme.palette.text.secondary
              : theme.palette.text.disabled,
          }}
            variant="standard"
            htmlFor="uncontrolled-native"
          >
            Estado
          </InputLabel>

          <Select
            disabled={!props.hasEdit}
            onChange={(event) => setData({ ...data, state: event.target.value })}
            value={data.state}
            label="Estado"
            variant="standard"
            fullWidth
          >
            <MenuItem value={"null"} disabled>
              Selecione o Estado
            </MenuItem>
            { mockEstados.map((state) => (
                <MenuItem key={state.id} value={state.sigla}>
                  {state.sigla}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"País"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={data.country}
            onChange={(event) =>
              setData({ ...data, country: event.target.value })
            }
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Site"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={data.site}
            onChange={(event) => setData({ ...data, site: event.target.value })}
          />
        </InputContainer>

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Link de imagem"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={data.picture}
            onChange={(event) =>
              setData({ ...data, picture: event.target.value })
            }
          />
        </InputContainer>
      </CompanyDetailCardContainer>
    </div>
  );
};
export default DealDetailCard;
