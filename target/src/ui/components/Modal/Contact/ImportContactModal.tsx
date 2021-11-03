/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import Title from "../../Title/Title";
import { CompanyTypes } from "types/Company";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import FileInput from "ui/components/Input/FileInput/FileInput";
import {
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
import contact from "pages/contact";

interface ImportContactModalProps {
  companies: any[];
}
const ImportContactModal: React.FC<ImportContactModalProps> = ({
  companies,
}) => {
  const { importContactModal, useImportContactModal, getContacts } =
    useContext(ContactContext);

  const [importedContacts, setImportedContacts] = useState<any[]>([]);

  const ReadDocument = async (file) => {
    let contacts = [];
    if (file) {
      await readXlsxFile(file).then((rows) => {
        rows.splice(0, 1);
        rows.forEach(async (row) => {
          const contact = {
            name: row[0] || "Nulo",
            email: row[1] || "Nulo",
            phone: row[2] || "Nulo",
            picture: row[3] || "Nulo",
            company: "Nulo",
          };
          contacts.push(contact);
        });
      });
      setImportedContacts(contacts);
    }
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
                  <TableCell align="right">{contact.picture}</TableCell>
                  <TableCell align="right">
                    <Select
                      onChange={(event) => {
                        contact.company = event.target.value;
                        setImportedContacts([...importedContacts]);
                      }}
                      variant="standard"
                      size="medium"
                      value={
                        contact.company === "Nulo" ? "default" : contact.company
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
