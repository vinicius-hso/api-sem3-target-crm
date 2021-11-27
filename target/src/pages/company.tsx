import React from "react";
import {
  CardsContainer,
  CompanyHeaderContainer,
  CompanyPageContainer,
  NewCompanyButtonContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import CompanyCard from "ui/components/CompanyCard/CompanyCard";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import {
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CreateCompanyModal from "ui/components/Modal/CreateCompanyModal";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import CompanyDetailModal from "ui/components/Modal/CompanyDetailModal";
import { CompanyTypes } from "types/Company";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";

interface CompanyPageProps {
  token: string;
  user: IUser;
}

function CompanyPage({ token, user }: CompanyPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const {
    companies,
    filteredCompany,
    removeFiltered,
    getData,
    hasError,
    isLoading,
  } = useCompanyPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  //MODAL CONTROL
  const [openCreateCompanyModal, setOpenCreateCompanyModal] =
    React.useState(false);
  const [openDetailCompanyModal, setOpenDetailCompanyModal] =
    React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState(
    {} as CompanyTypes
  );
  const [time, setTime] = React.useState(null);

  const handleChangeSearchTerm = (event) => {
    if (hasFiltered) {
      removeFiltered(true);
    }
    setSearchTerm(event.target.value);
    if (time) {
      clearTimeout(time);
      setTime(null);
    }
    setTime(
      setTimeout(() => {
        filteredCompany(event.target.value, valueType);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    removeFiltered(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  return (
    <CompanyPageContainer>
      <Head>
        <title>Empresas | Target</title>
      </Head>
      <CreateCompanyModal
        open={openCreateCompanyModal}
        setOpen={setOpenCreateCompanyModal}
        getData={getData}
      />
      <CompanyDetailModal
        open={openDetailCompanyModal}
        setOpen={setOpenDetailCompanyModal}
        company={selectedCompany}
        getData={getData}
        isAdmin={user.role === "ADMIN"}
      />
      <CompanyHeaderContainer>
        <TitleContainer>
          <Title title="EMPRESAS"></Title>
        </TitleContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "city", name: "Cidade" },
            { value: "state", name: "Estado" },
          ]}
          ChangeType={(event) => {
            setValueType(event.target.value);
          }}
          onChange={(event) => {
            handleChangeSearchTerm(event);
          }}
          value={searchTerm}
          onClick={removeFilters}
          hasFiltered={hasFiltered}
        />
      </CompanyHeaderContainer>
      <NewCompanyButtonContainer>
        <Tooltip
          title="Adicionar empresa"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Button
            variant="contained"
            sx={{ width: "auto", height: "30px" }}
            color="primary"
            onClick={() => setOpenCreateCompanyModal(true)}
            type="submit"
          >
            <i className="fa fa-plus" style={{ marginRight: "2px" }}></i> Nova
            empresa
          </Button>
        </Tooltip>
      </NewCompanyButtonContainer>
      <CardsContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {!isLoading && !hasError && !companies?.length && (
              <div style={{ textAlign: "center" }}>
                <Typography>Nenhuma empresa foi encontrada</Typography>
                <Typography>Deseja adicionar uma nova empresa?</Typography>
                <Button
                  sx={{ my: 2, color: "white" }}
                  variant="contained"
                  color="success"
                  onClick={() => setOpenCreateCompanyModal(true)}
                >
                  Adicionar nova empresa
                </Button>
              </div>
            )}

            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                name={company.name}
                city={company.city}
                state={company.state}
                email={company.site}
                picture={company.picture}
                onClick={() => {
                  setSelectedCompany(company);
                  setOpenDetailCompanyModal(true);
                }}
              />
            ))}
          </>
        )}
      </CardsContainer>
    </CompanyPageContainer>
  );
}

export default CompanyPage;

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
