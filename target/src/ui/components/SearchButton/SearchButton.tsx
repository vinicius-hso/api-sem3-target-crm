import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { mockEstados } from "data/utils/mock";
import React, { useEffect } from "react";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { DividerStyled, HasFilter, PaperStyled } from "./SearchButton.style";

interface SearchButtomProps {
  placeholder: string;
  buttomIcon: string;
  searchTypes: any[];
  viewButtonGroup: boolean;
  ChangeType: any;
  typeValue: string | number;
  value: string;
  onChange: any;
  selectListValues?: any[];
  hasFiltered: boolean;
  onClick: any;
}

const SearchButtom: React.FC<SearchButtomProps> = (props) => {
  useEffect(() => {}, [props.typeValue]);



  return (
    <PaperStyled
      style={{ paddingBottom: props.typeValue === "name" ? "30px" : 0 }}
    >
      <i
        style={{ marginTop: "10px", marginRight: "5px", fontSize: "20px" }}
        className="fa fa-search"
      ></i>
      {props.typeValue === "name" || props.typeValue === "city" ? (
        <TextFieldMask
          label={`Filtre por ${props.typeValue === "name" ? "nome" : "cidade"
            } `}
          fullWidth
          variant={"standard"}
          size="medium"
          value={props.value}
          onChange={props.onChange}
          sx={{ minWidth: "150px", mt: "2px" }}
        />
      ) : (
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Selecione um valor
          </InputLabel>

          <Select
            variant="standard"
            fullWidth
            value={props.value}
            onChange={props.onChange}
          >
            {mockEstados.map((state, index) => (
              <MenuItem key={index} value={state.sigla}>
                {state.sigla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <DividerStyled orientation="vertical" sx={{ mx: 1 }} />
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Tipo do filtro
        </InputLabel>
        <Select
          value={props.typeValue}
          onChange={props.ChangeType}
          variant="standard"
        >
          {props.searchTypes.map((type, index) => (
            <MenuItem key={index} value={type.value}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {props.hasFiltered ? (
        <HasFilter onClick={props.onClick}>
          <i className="fa fa-times" aria-hidden="true"></i>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Remover filtro
          </Typography>
        </HasFilter>
      ) : (
        <div />
      )}
    </PaperStyled>
  );
};

export default SearchButtom;
