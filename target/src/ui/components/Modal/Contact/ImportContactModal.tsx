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
} from "@material-ui/core";
import readXlsxFile from "read-excel-file";
import Select from "ui/components/Input/Select/Select";
import axios from "axios";
import { serviceApi } from "data/services/ServiceApi";

interface ImportContactModalProps {
  companies: any[];
}
const ImportContactModal: React.FC<ImportContactModalProps> = ({
  companies,
}) => {
  const {
    importContactModal,
    useImportContactModal,
    sendImportedContacts,
    getContacts,
  } = useContext(ContactContext);

  const [importedContacts, setImportedContacts] = useState<any[]>([]);

  const ReadDocument = async (file) => {
    let contacts = [];
    if (file) {
      await readXlsxFile(file).then((rows) => {
        rows.splice(0, 1);
        rows.forEach(async (row) => {
          const contact = {
            name: row[0] || "Vazio",
            email: row[1] || "Vazio",
            phone: row[2] || "Vazio",
            picture: row[3] || "Vazio",
            company: "Vazio",
          };
          contacts.push(contact);
        });
      });
      setImportedContacts(contacts);
    }
  };

  const handleSubmit = async (contacts) => {
    const res = await sendImportedContacts(contacts);
    console.log(res);
  };

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useImportContactModal();
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </CloseButtonStyled>
      <Title title="Importar contatos" />
      <FileInput onChange={(file) => ReadDocument(file)} />

      {importedContacts.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Telefone</TableCell>
                  <TableCell align="right">Link de imagem</TableCell>
                  <TableCell align="right">Empresa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {importedContacts.map((contact, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {contact.name}
                    </TableCell>
                    <TableCell align="right">{contact.email}</TableCell>
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
                    <TableCell align="right">
                      <Select
                        onChange={(event) => {
                          contact.company = event.target.value;
                          setImportedContacts([...importedContacts]);
                        }}
                        variant="standard"
                        size="medium"
                        value={
                          contact.company === "Vazio"
                            ? "default"
                            : contact.company
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            sx={{ width: "200px", margin: "32px auto 0" }}
            color="primary"
            onClick={() => handleSubmit(importedContacts)}
          >
            Confirmar
          </Button>
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
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default ImportContactModal;
