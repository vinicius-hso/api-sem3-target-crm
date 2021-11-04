import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import DealDetailCard from "../DealDetailCard/DealDetailCard";
import {
  ActionsDealDetailCardContainer,
  LinkPhoneStyled,
  NewActivityButton,
  NewActivityButtonLabel,
  NewActivityContainer,
} from "../DealDetailCard/DealDetailCard.style";
import Activity from "../Activity/Activity";
import { useDealPage } from "data/services/hooks/PageHooks/DealHook";
import AuthContext from "contexts/AuthContext";
import { ButtonsContainer } from "./ModalStyles/ButtonsContainer";
import { LinkStyled } from "../Link/Link.style";

const DetailModal: React.FC = () => {
  const { dealDetailModalState, useDealDetailModal, dealDetail } =
    useContext(PipelineContext);
  const { createActivity, editDeal, updateStatus } = useDealPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [hasStatusChange, setHasStatusChange] = useState(false);
  const [hasNewActivity, setHasNewActivity] = useState(false);
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    description: "",
    tag: "WARM",
    createdAt: new Date(Date.now()),
    createdBy: user,
  });

  const handleClick = () => {
    setData({
      name: "",
      description: "",
      tag: "WARM",
      createdAt: new Date(Date.now()),
      createdBy: user,
    });
    setHasNewActivity(!hasNewActivity);
  };

  const handleSubmit = () => {
    if (data.name.length && data.description.length) {
      createActivity(dealDetail.id, data);
      dealDetail.activity.unshift(data);
      handleClick();
    }
  };

  const handleSubmitEdit = (data) => {
    data.value = data.value.replace(/\D+/g, "");
    editDeal(dealDetail.id, data);
    setHasEdit(false);
  };

  const body = (
    <ModalContainer>
      {dealDetail.id ? (
        <>
          <CloseButtonStyled
            onClick={() => {
              useDealDetailModal("");
              window.location.reload();
            }}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </CloseButtonStyled>

          <Title title={`Detalhes da negociação ${dealDetail?.name}`} />
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              onClick={() => {
                setHasStatusChange(!hasStatusChange);
              }}
              variant="contained"
              sx={{
                width: "160px",
                mb: 2,
              }}
              size="small"
              color="primary"
              type="submit"
            >
              {!hasStatusChange ? "Finalizar" : "Cancelar"}
            </Button>
            <Button
              onClick={() => {
                updateStatus(dealDetail.id, { status: "ARCHIVED" });
                setHasStatusChange(false);
              }}
              variant="contained"
              size="small"
              sx={{
                width: "160px",
                mb: 2,
              }}
              color="secondary"
              type="submit"
            >
              Arquivar
            </Button>
          </div>
          <div
            style={{ display: hasStatusChange ? "flex" : "none", gap: "5px" }}
          >
            <Button
              onClick={() => {
                updateStatus(dealDetail.id, { status: "WON" });
                setHasStatusChange(false);
              }}
              variant="contained"
              sx={{
                width: "160px",
                mb: 2,
              }}
              size="small"
              color="success"
              type="submit"
            >
              Ganhou
            </Button>
            <Button
              onClick={() => {
                updateStatus(dealDetail.id, { status: "LOST" });
                setHasStatusChange(false);
              }}
              variant="contained"
              sx={{
                width: "160px",
                mb: 2,
              }}
              size="small"
              color="error"
              type="submit"
            >
              Perdeu
            </Button>
          </div>

          <DealDetailCard
            onClick={() => setHasEdit(!hasEdit)}
            hasEdit={hasEdit}
            name={dealDetail?.name}
            saveEdit={(data) => handleSubmitEdit(data)}
            company={{
              value: dealDetail.company?.id,
            }}
            contact={{
              label: dealDetail.contact?.name,
              value: dealDetail.contact?.id,
            }}
            value={dealDetail?.value}
            currentResponsible={
              dealDetail.activity[dealDetail.activity?.length - 1].createdBy
                .name
            }
            status={dealDetail?.status}
          />
          <br />
          <Title title="Ações do contato" />
          <ActionsDealDetailCardContainer>
            <div style={{ display: "flex" }}>
              <TextFieldMask
                label={"Negociação"}
                variant={"standard"}
                size="medium"
                value={dealDetail.contact?.email}
                disabled
              />
              <LinkStyled>
                <IconButton type="submit" aria-label="search">
                  <CopyToClipboard text={dealDetail.contact?.email}>
                    <i className={`fa fa-clone`}></i>
                  </CopyToClipboard>
                </IconButton>
              </LinkStyled>

              <LinkStyled href={`mailto:${dealDetail.contact?.email}`}>
                <IconButton type="submit" aria-label="search">
                  <i className={`fa fa-envelope-o`}></i>
                </IconButton>
              </LinkStyled>
            </div>
            <div style={{ display: "flex" }}>
              <TextFieldMask
                label={"Negociação"}
                variant={"standard"}
                size="medium"
                value={dealDetail.contact?.phone}
                sx={{ width: "45px" }}
                disabled
              />{" "}
              <LinkStyled>
                <IconButton type="submit">
                  <CopyToClipboard text={dealDetail.contact?.phone}>
                    <i className={`fa fa-clone`}></i>
                  </CopyToClipboard>
                </IconButton>
              </LinkStyled>
              <LinkPhoneStyled href={`tel:${dealDetail.contact?.phone}`}>
                <IconButton type="submit" aria-label="search">
                  <i className={`fa fa-phone`}></i>
                </IconButton>
              </LinkPhoneStyled>
              <LinkStyled
                target="__blank"
                rel="no-referrer"
                href={`https://api.whatsapp.com/send?phone=55${dealDetail.contact?.phone}`}
              >
                <IconButton type="submit" aria-label="search">
                  <i className={`fa fa-whatsapp`}></i>
                </IconButton>
              </LinkStyled>
            </div>
          </ActionsDealDetailCardContainer>
          <br />
          <Title title="Histórico de atividades" />
          <div style={{ position: "relative" }}>
            <NewActivityButton
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              onClick={handleClick}
            >
              <i style={{ marginRight: "2px" }} className="fa fa-plus"></i>
              <NewActivityButtonLabel> Nova atividade</NewActivityButtonLabel>
            </NewActivityButton>
          </div>
          {hasNewActivity ? (
            <NewActivityContainer>
              <TwoColumnsContainer>
                <TextFieldMask
                  label={"Titulo"}
                  variant={"standard"}
                  size="medium"
                  value={data.name}
                  onChange={(event) =>
                    setData({ ...data, name: event.target.value })
                  }
                />
                <FormControl fullWidth>
                  <InputLabel>Tag</InputLabel>
                  <Select
                    label="Tag"
                    fullWidth
                    value={data.tag}
                    variant="standard"
                    onChange={(event) =>
                      setData({ ...data, tag: event.target.value })
                    }
                  >
                    <MenuItem value={"COLD"}>Fria</MenuItem>
                    <MenuItem value={"WARM"}>Morna</MenuItem>
                    <MenuItem value={"HOT"}>Quente</MenuItem>
                  </Select>
                </FormControl>
              </TwoColumnsContainer>
              <TextFieldMask
                multiline
                label={"Descreva aqui..."}
                variant={"standard"}
                size="medium"
                value={data.description}
                onChange={(event) =>
                  setData({ ...data, description: event.target.value })
                }
                rows={3}
              />
              <ButtonsContainer>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="small"
                  sx={{
                    width: "160px",
                    mt: 1,
                  }}
                  color="primary"
                  type="submit"
                >
                  Salvar
                </Button>

                <Button
                  onClick={handleClick}
                  variant="contained"
                  size="small"
                  color="error"
                  type="submit"
                  sx={{
                    width: "160px",
                    mt: 1,
                  }}
                >
                  Cancelar
                </Button>
              </ButtonsContainer>
            </NewActivityContainer>
          ) : (
            <div />
          )}
          {dealDetail.activity
            .sort((a, b) =>
              a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
            )
            .map((act) => (
              <Activity
                key={act.createdAt}
                title={act.name}
                tag={act.tag}
                createdAt={act.createdAt}
                createdBy={act.createdBy.name}
                description={act.description}
              />
            ))}
        </>
      ) : (
        <div>Não foi possivel carregar dados, atualize a pagina</div>
      )}
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={dealDetailModalState}
        onClose={() => useDealDetailModal("")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default DetailModal;
