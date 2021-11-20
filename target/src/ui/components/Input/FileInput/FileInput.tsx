import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { InputContainer } from "./FileInput.style";
import TextFieldMask from "../TextFieldMask/TextFieldMask";

interface FileInputProps {
  onChange: (value: File) => void;
}
const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [fileName, setFileName] = useState("");

  return (
    <InputContainer>
      <TextFieldMask
        value={fileName}
        label={fileName ? "Arquivo selecionado" : "Selecione um arquivo"}
        variant="standard"
        size="small"
        fullWidth
        disabled={fileName ? false : true}
        focused
      />

      <label htmlFor="contained-button-file">
        <input
          id="contained-button-file"
          style={{ display: "none" }}
          type="file"
          accept=".xlsx"
          onChange={(event) => {
            onChange(event.target?.files[0]);
            setFileName(event.target?.files[0]?.name || "");
          }}
        />
        <Button variant="contained" component="span">
          Selecionar arquivo
        </Button>
      </label>
    </InputContainer>
  );
};
export default FileInput;
