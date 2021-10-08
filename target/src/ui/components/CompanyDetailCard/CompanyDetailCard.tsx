import { FormControl, MenuItem, Select, Typography } from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import React, { useContext, useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import PipelineContext from "contexts/PipelineContext";
import Alert from "../AlertComponent/AlertComponent";
import {
  CompanyDetailCardContainer,
  EditButton,
  InputContainer,
} from "./CompanyDetailCard.style";
import { CompanyTypes } from "types/Company";

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
        <EditButton
          style={{
            display: props.hasEdit ? "inline" : "none",
          }}
          onClick={() => props.saveEdit(data)}
        >
          {"Salvar"}
          <i
            style={{ marginLeft: "2px" }}
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </EditButton>

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

        <InputContainer>
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

        <InputContainer>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Estado"}
            fullWidth
            variant={"standard"}
            size="medium"
            defaultValue={data.state}
            onChange={(event) =>
              setData({ ...data, state: event.target.value })
            }
          />
        </InputContainer>

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
