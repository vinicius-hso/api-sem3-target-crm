import React, { useState } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Title from "../Title/Title";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import {
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { mockEstados } from "data/utils/mock";
import { toast } from "react-toastify";

interface CreateCompanyModalProps {
  open: boolean;
  setOpen: any;
  getData: () => void;
}
const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  open,
  setOpen,
  getData,
}) => {
  const { createCompany } = useCompanyPage();

  const [data, setData] = useState<CompanyTypes>({
    name: "",
    country: "",
    state: "",
    city: "",
    site: "",
    picture: "",
    cep: "",
    address: "",
  });

  const [submit, isSubmit] = useState(false);

  async function handleSubmit() {
    isSubmit(true);
    if (data?.name) {
      await createCompany(data);
      getData();
      onClose();
    } else {
      toast.warning(
        "Preenchimento invalido, verifique os campos e tente novamente."
      );
    }
  }

  const onClose = () => {
    setData({
      name: "",
      country: "",
      state: "",
      city: "",
      site: "",
      picture: "",
      cep: "",
      address: "",
    });
    isSubmit(false);
    setOpen(false);
  };

  const body = (
    <ModalContainer>
      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            onClose();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Nova empresa" />
      <TwoColumnsContainer>
        <TextFieldMask
          style={{ marginBottom: "-14px" }}
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome da empresa"
          variant="standard"
          size="small"
          fullWidth
          error={submit && !data.name}
          helperText={!data.name && submit ? "Informe o nome da empresa" : " "}
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, city: event.target.value })}
          value={data.city}
          label="Cidade"
          variant="standard"
          size="small"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Estado
          </InputLabel>

          <Select
            onChange={(event) =>
              setData({ ...data, state: event.target.value })
            }
            value={data.state}
            label="Estado"
            variant="standard"
            fullWidth
          >
            <MenuItem value={"null"} disabled>
              Selecione o Estado
            </MenuItem>
            {mockEstados.map((state) => (
              <MenuItem key={state.id} value={state.sigla}>
                {state.sigla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextFieldMask
          onChange={(event) =>
            setData({ ...data, country: event.target.value })
          }
          value={data.country}
          label="País"
          variant="standard"
          size="small"
          fullWidth
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, site: event.target.value })}
          value={data.site}
          label="Site"
          variant="standard"
          size="small"
          fullWidth
        />

        <TextFieldMask
          onChange={(event) =>
            setData({ ...data, picture: event.target.value })
          }
          value={data.picture}
          label="Link de imagem"
          variant="standard"
          size="small"
          fullWidth
        />
      </TwoColumnsContainer>
      <Tooltip
        title="Adicionar empresa"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={() => handleSubmit()}
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          sx={{ mt: 4 }}
        >
          Adicionar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={open}
        onClose={() => {
          onClose();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default CreateCompanyModal;
