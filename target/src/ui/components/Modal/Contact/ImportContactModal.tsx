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
const ImportContactModal: React.FC<ImportContactModalProps> = ({
  companies,
  getData,
}) => {
  const { importContactModal, useImportContactModal, sendImportedContacts } =
    useContext(ContactContext);

  const [importedContacts, setImportedContacts] = useState<any[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

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
    if (res.length) {
      setImportedContacts(res);
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
        title={`(${importedContacts.length}) erros de importação`}
        message={`Os seguintes contatos não puderam ser criados: 
        ${importedContacts.forEach((contact) => contact.name + ", ")} 
        deseja tentar novamente?`}
        type={"question"}
        open={hasError}
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
