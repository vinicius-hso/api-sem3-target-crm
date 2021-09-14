import {
  FormControl,
  IconButton,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
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
}

const SearchButtom: React.FC<SearchButtomProps> = (props) => {
  return (
    <PaperStyled>
      <InputBaseStyled
        placeholder={props.placeholder}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="submit" aria-label="search">
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
