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
import { getCepService } from "data/utils/getCepService";
import { formatCep } from "data/utils/formatCep";
import { mockEstados } from "data/utils/mock";

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

  const [time, setTime] = useState(null);
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
    data.name
      ? createCompany(data).then(() => {
          getData();
          onClose();
        })
      : null;
  }

  const handleChangeCep = (event) => {
    setData({ ...data, cep: formatCep(event.target.value) });
    if (event.target.value.length === 9) {
      if (time) {
        clearTimeout(time);
        setTime(null);
      }
      setTime(
        setTimeout(async () => {
          const address: any = await getCepService(event.target.value);
          if (address.cep) {
            setData({
              ...data,
              cep: event.target.value,
              city: address.localidade,
              state: address.uf,
              address: address.logradouro,
              country: "Brasil",
            });
          } else {
            console.log("invalidCep");
          }
        }, 1000)
      );
      clearTimeout(time);
    }
  };

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
          onChange={(event) => handleChangeCep(event)}
          value={data.cep}
          label="CEP"
          variant="standard"
          size="small"
          fullWidth
        />

        <TextFieldMask
          onChange={(event) =>
            setData({ ...data, address: event.target.value })
          }
          value={data.address}
          label="Endereço"
          variant="standard"
          size="small"
          fullWidth
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
