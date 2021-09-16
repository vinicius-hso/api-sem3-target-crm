import React from "react";
import ScrumBoard from "data/services/servicesComponents/ScrumBoard";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { CircularProgress, Typography } from "@material-ui/core";
import {
  DealsHeaderContainer,
  DealsPageContainer,
  DealsTotalTagsContainer,
  PipelinesContainer,
  TitleHeaderContainer,
} from "@styles/pagesStyle/deals.style";
import Title from "ui/components/Title/Title";
<<<<<<< HEAD
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer, LoginContainer } from "@styles/pagesStyle/index.styles";
import { useIndexPage } from "data/services/hooks/PageHooks/indexPageHook";
import CustomLink from "ui/components/Link/Link";
import Welcome from "ui/components/Welcome/welcome";

function HomePage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    data,
    hasError,
    emailIsValid,
    passwordIsValid,
    login,
    passwordVerification,
    emailVerification,
  } = useIndexPage();

  return (
    <LoginContainer>
    <Welcome/>
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Title
        title={"Login"}
        subtitle={<p>Faça login para acessar sua área restrita</p>}
      ></Title>
=======
import DeleteModal from "ui/components/Modal/DeleteModal";
import UpDateModal from "ui/components/Modal/UpDateModal";
import CreateModal from "ui/components/Modal/CreateModal";
import SearchButtom from "ui/components/SearchButton/SearchButton";
function DealPipeline() {
  const { hasError, isLoading } = usePipelineComponent();

  return (
    <DealsPageContainer>
      <DeleteModal />
      <UpDateModal />
      <CreateModal />
      <DealsHeaderContainer>
        <TitleHeaderContainer>
          <Title
            title="PIPELINE"
            subtitle={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Typography>R$ 12.257,75</Typography>
                <i
                  className="fa fa-arrow-right"
                  style={{ position: "relative", top: "2px" }}
                ></i>
                <Typography>8 negociações</Typography>
              </div>
            }
          ></Title>
          <DealsTotalTagsContainer>
            <div>
              <i className="fa fa-fire" style={{ color: "#e63706" }}></i>
              <span> 5</span>
            </div>
            <div>
              <i className="fa fa-bolt" style={{ color: "#effa5c" }}></i>
              <span> 4</span>
            </div>
            <div>
              <i className="fa fa-snowflake-o" style={{ color: "#3eccf0" }}></i>
              <span> 2</span>
            </div>
          </DealsTotalTagsContainer>
        </TitleHeaderContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue="value"
          searchTypes={[
            { value: 10, name: "coxinha" },
            { value: 10, name: "coxinha" },
            { value: 10, name: "coxinha" },
          ]}
          ChangeType={() => {}}
        />
      </DealsHeaderContainer>
>>>>>>> 41902dc8e875d0be9b165ea0c73eb15a6ae58fff

      <PipelinesContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <ScrumBoard />
        )}
<<<<<<< HEAD
        <TextFieldMask
          label={"E-mail"}
          fullWidth
          variant={"standard"}
          icon="fa fa-envelope"
          size="small"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={emailVerification}
          error={!emailIsValid}
          helperText={!emailIsValid ? "Formato inválido" : ""}
        />
        <TextFieldMask
          fullWidth
          label={"Senha"}
          variant="standard"
          icon="fa fa-unlock-alt"
          type="password"
          size="small"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={passwordVerification}
          error={!passwordIsValid}
          helperText={
            !passwordIsValid ? "A senha deve ter no mínimo 6 caracteres" : ""
          }
        />
        <Button
          variant="contained"
          sx={{ width: "150px", mt: 1 }}
          color="primary"
          onClick={() => login(email, password)}
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            "Entrar"
          )}
        </Button>
        <CustomLink href="/deals" text="Esqueceu a senha? Clique aqui" />
      </FormContainer>
    </div>
    </LoginContainer>

=======
      </PipelinesContainer>
    </DealsPageContainer>
>>>>>>> 41902dc8e875d0be9b165ea0c73eb15a6ae58fff
  );
}

export default DealPipeline;
