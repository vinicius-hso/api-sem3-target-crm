import {
  FormControl,
  IconButton,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import React, { useEffect, useMemo, useState } from "react";
import TextFieldMask from 'ui/components/Input/TextFieldMask/TextFieldMask';
import { mockTags } from '../../../data/utils/mock';
import {
  DividerStyled,
  InputBaseStyled,
  PaperStyled,
} from "./SearchButton.style";

interface SearchButtomProps {
  placeholder: string;
  buttomIcon: string;
  searchTypes: any[];
  viewButtonGroup: boolean;
  ChangeType: any;
  typeValue: string | number;
  onClick: any;
  value: string;
  onChange: any;
}

const SearchButtom: React.FC<SearchButtomProps> = (props) => {

  const [selectListValues, setSelectListValues] = useState([])
  const { formatListToSelect } = useCompanyPage();

  useEffect(() => {
    if (props.typeValue === "tag") {
      setSelectListValues([{ value: "default", label: "todos" }])
      selectListValues.push(...mockTags)
    } else if (props.typeValue === "company") {
      setSelectListValues([{ value: "default", label: "todos" }])
      const res = formatListToSelect()
      
    } 
  }, [props.typeValue])

  return (
    <PaperStyled>
      {
        props.typeValue === "name" ? 
          <TextFieldMask
          placeholder={props.placeholder}
          inputProps={{ "aria-label": "search google maps" }}
          value={props.value}
          onChange={props.onChange}
          />
        : 
          <Select native value={props.value} onChange={props.onChange}>
              {selectListValues.map((type, index) => (
                <option key={index} value={type.value}>
                  {type.label}
                </option>
              ))}
          </Select>
      }
      <IconButton type="submit" aria-label="search" onClick={props.onClick}>
        <i className={`fa ${props.buttomIcon}`}></i>
      </IconButton>
      <DividerStyled orientation="vertical" />
      <FormControl variant="outlined" size="small">
        <Select native value={props.typeValue} onChange={props.ChangeType}>
          {props.searchTypes.map((type, index) => (
            <option key={index} value={type.value}>
              {type.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </PaperStyled>
  );
};

export default SearchButtom;
