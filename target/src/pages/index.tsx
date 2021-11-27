import React, { useContext, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Tooltip,
  Button,
} from "@material-ui/core";
import {
  DealsHeaderContainer,
  DealsPageContainer,
  DealsTotalTagsContainer,
  PipelinesContainer,
  TitleHeaderContainer,
} from "@styles/pagesStyle/deals.style";
import Title from "ui/components/Title/Title";
import DeleteModal from "ui/components/Modal/DeleteModal";
import UpDateModal from "ui/components/Modal/UpDateModal";
import CreateModal from "ui/components/Modal/CreateModal";
import CreateDealModal from "ui/components/Modal/CreateDealModal";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import PipelineContext from "contexts/PipelineContext";
import { formatValue } from "data/utils/formatValue";
import DetailModal from "ui/components/Modal/DealDetailModal";
import { mockTags } from "data/utils/mock";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { DynamicPiline } from "data/services/servicesComponents/DynamicPipelines";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";

interface MainPageProps {
  token: string;
  user: IUser;
}

function MainPage({ token, user }: MainPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const {
    hasError,
    isLoading,
    dealTotalParams,
    filterDeals,
    removefilterDeals,
    getPipelines,
    pipelines,
    UseCreateModal,
  } = useContext(PipelineContext);

  useEffect(() => {
    getPipelines();
  }, []);

  const [valueType, setValueType] = React.useState("name");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [time, setTime] = React.useState(null);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatContactToSelect } = useContactPage();

  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "tag") {
      setSelectListValues(mockTags);
    } else if (event.target.value === "company") {
      setSelectListValues(formatCompaniesToSelect);
    } else if (event.target.value === "contact") {
      setSelectListValues(formatContactToSelect);
    } else {
      setSelectListValues([]);
    }
  };

  const handleChangeSearchTerm = (event) => {
    let resetFilter = false;
    if (hasFiltered) {
      resetFilter = true;
    }
    setSearchTerm(event.target.value);
    if (time) {
      clearTimeout(time);
      setTime(null);
    }
    setTime(
      setTimeout(() => {
        filterDeals(event.target.value, valueType, resetFilter);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    removefilterDeals(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <DealsPageContainer>
      <Head>
        <title>Negociações | Target</title>
      </Head>

      <DeleteModal getData={getPipelines} />
      <UpDateModal getData={getPipelines} />
      <CreateModal getData={getPipelines} />
      <CreateDealModal getData={getPipelines} />
      <DetailModal getData={getPipelines} />

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
                <Tooltip
                  title="Valor total"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Typography>
                    {formatValue(dealTotalParams?.budgetSum)}
                  </Typography>
                </Tooltip>
                <i
                  className="fa fa-arrow-right"
                  style={{ position: "relative", top: "2px" }}
                ></i>
                <Tooltip
                  title="Total de negociações"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Typography>
                    {dealTotalParams?.totalDeals} negociações
                  </Typography>
                </Tooltip>
              </div>
            }
          ></Title>
          <DealsTotalTagsContainer>
            <div>
              <Tooltip
                title="Negociações quentes"
                placement="top-start"
                enterDelay={500}
                leaveDelay={100}
              >
                <i className="fa fa-fire" style={{ color: "#e63706" }}></i>
              </Tooltip>
              <span> {dealTotalParams?.hotDeals}</span>
            </div>
            <div>
              <Tooltip
                title="Negociações mornas"
                placement="top-start"
                enterDelay={500}
                leaveDelay={100}
              >
                <i className="fa fa-bolt" style={{ color: "#effa5c" }}></i>
              </Tooltip>
              <span> {dealTotalParams?.warmDeals}</span>
            </div>
            <div>
              <Tooltip
                title="Negociações frias"
                placement="top-start"
                enterDelay={500}
                leaveDelay={100}
              >
                <i
                  className="fa fa-snowflake-o"
                  style={{ color: "#3eccf0" }}
                ></i>
              </Tooltip>
              <span> {dealTotalParams?.coldDeals}</span>
            </div>
          </DealsTotalTagsContainer>
        </TitleHeaderContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          value={searchTerm}
          selectListValues={selectListValues}
          hasFiltered={hasFiltered}
          onClick={removeFilters}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "company", name: "Empresa" },
            { value: "contact", name: "Contato" },
            { value: "tag", name: "Tag" },
          ]}
          ChangeType={(event) => {
            handleChangeValueType(event);
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handleChangeSearchTerm(event);
          }}
        />
      </DealsHeaderContainer>
      <PipelinesContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {!pipelines.length && !isLoading && !hasError && (
              <div style={{ textAlign: "center" }}>
                <Typography>Nenhum pipeline foi encontrado</Typography>
                <Typography>Deseja adicionar um novo pipeline?</Typography>
                <Button
                  sx={{ my: 2, color: "white" }}
                  variant="contained"
                  color="success"
                  onClick={() => UseCreateModal()}
                >
                  Adicionar nova pipeline
                </Button>
              </div>
            )}
            <DynamicPiline />
          </>
        )}
      </PipelinesContainer>
    </DealsPageContainer>
  );
}

export default MainPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}): Promise<any> => {
  const data = parseCookies(req);
  let token: string = "";
  let user: any = {};

  Object.keys(data).find((key, i) => {
    if (key === "@target:token") {
      token = Object.values(data)[i];
    }
    if (key === "@target:user") {
      user = Object.values(data)[i];
    }
  });
  if (!token?.length && resolvedUrl !== "/login") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    try {
      serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await serviceApi.get("/auth/faw1efawe3f14aw8es3v6awer51xx3/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  if (user) {
    user = JSON.parse(user);
  }
  return {
    props: {
      user,
      token,
    },
  };
};
