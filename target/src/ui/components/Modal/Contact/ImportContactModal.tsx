/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import Title from "../../Title/Title";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import FileInput from "ui/components/Input/FileInput/FileInput";
import {
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import readXlsxFile from "read-excel-file";
import Select from "ui/components/Input/Select/Select";
import axios from "axios";
import { serviceApi } from "data/services/ServiceApi";
import { IContact } from "types/Contact";
import Dialog from "ui/components/Dialog/Dialog";

interface ImportContactModalProps {
  companies: any[];
  getData: () => void;
}

interface ImportResult {
  errors: any[];
  alreadyExistMessageCount: number;
  invalidValuesMessageCount: number;
}

const ImportContactModal: React.FC<ImportContactModalProps> = ({
  companies,
  getData,
}) => {
  const { importContactModal, useImportContactModal, sendImportedContacts } =
    useContext(ContactContext);

  const [importedContacts, setImportedContacts] = useState<any[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorsLength, setErrorsLength] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function formatMessage(importResult: ImportResult) {
    let m1 = "";
    let m2 = "";
    let m3 = "";
    if (importResult.errors.length) {
      m1 = `Os contatos não puderam ser importados pois:\n`;
    }
    if (importResult.alreadyExistMessageCount > 0) {
      m2 = `${importResult.alreadyExistMessageCount} contatos já existem em nosso banco de dados.\n`;
    }
    if (importResult.invalidValuesMessageCount > 0) {
      m3 = `${importResult.invalidValuesMessageCount} contatos possuem dados inválidos.\n`;
    }
    console.log(m1);
    console.log(m2);
    console.log(m3);
    setErrorMessage(m1 + m2 + m3 + "\nDeseja tentar novamente?");
  }

  const ReadDocument = async (file) => {
    let contacts = [];
    if (file) {
      await readXlsxFile(file).then((rows) => {
        rows.splice(0, 1);
        rows.forEach(async (row) => {
          const contact = {
            name: row[0] || "",
            email: row[1] || "",
            phone: row[2] || "",
            picture: row[3] || "",
            company: "",
          };
          contacts.push(contact);
        });
      });
      setImportedContacts(contacts);
    }
  };

  const handleSubmit = async (contacts: IContact[]) => {
    const res = await sendImportedContacts(contacts);
    setErrorsLength(res.errors.length);
    formatMessage({
      errors: res.errors,
      alreadyExistMessageCount: res.alreadyExistMessageCount,
      invalidValuesMessageCount: res.invalidValuesMessageCount,
    });
    // setImportResult({
    //   errors: res.errors,
    //   alreadyExistMessageCount: res.alreadyExistMessageCount,
    //   invalidValuesMessageCount: res.invalidValuesMessageCount,
    // });
    // formatMessage(importResult);
    // console.log("From Submit ->", res);
    if (res.errors.length) {
      setImportedContacts(res.errors);
      setHasError(true);
      getData();
    } else {
      getData();
      useImportContactModal();
    }
  };

  const body = (
    <ModalContainer>
      <Dialog
        title={`(${errorsLength}) erros de importação`}
        // message={`Os seguintes contatos não puderam ser criados:
        // ${importResult.errors.forEach((contact) => contact.name + ", ")}
        // pois ${
        //   importResult.alreadyExistMessageCount
        // } contatos do arquivo já existem em nosso banco de dados e ${
        //   importResult.invalidValuesMessageCount
        // } possuem dados inválidos!\n Deseja tentar novamente?`}
        message={errorMessage}
        type={"question"}
        open={errorMessage && hasError}
        setOpen={() => setHasError(false)}
        result={(res) => {
          res ? handleSubmit(importedContacts) : setHasError(false);
          setImportedContacts([]);
          useImportContactModal();
        }}
      />

      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            setImportedContacts([]);
            useImportContactModal();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Importar contatos" />
      <FileInput onChange={(file) => ReadDocument(file)} />

      {importedContacts.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="left">Empresa</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Telefone</TableCell>
                  <TableCell align="left">Link de imagem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {importedContacts.map((contact, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      <Select
                        onChange={(event) => {
                          contact.company = event.target.value;
                          setImportedContacts([...importedContacts]);
                        }}
                        variant="standard"
                        size="medium"
                        value={
                          contact.company === "" ? "default" : contact.company
                        }
                        fullWidth
                      >
                        <MenuItem value={"default"}>
                          Selecione uma empresa
                        </MenuItem>
                        {companies.map((company) => (
                          <MenuItem value={company.value} key={company.value}>
                            {company.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {contact.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        maxWidth: "160px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {contact.email}
                    </TableCell>
                    <TableCell align="right">{contact.phone}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "80px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      align="right"
                    >
                      {contact.picture}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Tooltip
            title="Confirmar importação"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              sx={{ width: "200px", margin: "32px auto 0", color: "white" }}
              color="success"
              onClick={() => handleSubmit(importedContacts)}
            >
              Confirmar
            </Button>
          </Tooltip>
        </>
      ) : (
        <div />
      )}
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={importContactModal}
        onClose={() => {
          setImportedContacts([]);
          useImportContactModal();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default ImportContactModal;
