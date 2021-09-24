import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import React, { useEffect, useState } from "react";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { mockTags } from "../../../data/utils/mock";
import { DividerStyled, PaperStyled } from "./SearchButton.style";

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
}

const SearchButtom: React.FC<SearchButtomProps> = (props) => {
  useEffect(() => {}, [props.typeValue]);

  return (
    <PaperStyled>
      <i
        style={{ marginTop: "10px", marginRight: "5px", fontSize: "20px" }}
        className="fa fa-search"
      ></i>
      {props.typeValue === "name" ? (
        <TextFieldMask
          label={"Filtre pelo nome da negociação"}
          fullWidth
          variant={"standard"}
          size="medium"
          value={props.value}
          onChange={props.onChange}
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
            {props.selectListValues.map((type, index) => (
              <MenuItem key={index} value={type.value}>
                {type.label}
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
    </PaperStyled>
  );
};

export default SearchButtom;
