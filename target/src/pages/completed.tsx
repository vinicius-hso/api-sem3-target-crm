import React, { useEffect, useState } from "react";
import {
  CardsContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import {
  CompletedButtonsContainer,
  CompletedHeaderContainer,
  CompletedPageContainer,
} from "@styles/pagesStyle/completed.style";
import {
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@material-ui/core";
import { useCompletedPage } from "data/services/hooks/PageHooks/CompletedHook";
import DealCompletedCard from "ui/components/DealCompletedCard/DealCompletedCard";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { DealTypes } from "types/Deal";
import AchivedDealModal from "ui/components/Modal/Completed/ArchivedModal";
import CompletedDealModal from "ui/components/Modal/Completed/CompletedModal";
import Title from "ui/components/Title/Title";
import { StatusTypes } from "types/Status";
import Head from "next/head";
import { parseCookies } from "data/services/cookie";
import { GetServerSideProps } from "next";
import { serviceApi } from "data/services/ServiceApi";

interface CompletedPageProps {
  token: string;
}

function CompletedPage({ token }: CompletedPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const { deals, filterDeals, removefilterDeals, getData } = useCompletedPage();
  const [valueType, setValueType] = useState("name");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [time, setTime] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = useState("WON");
  const [selectListValues, setSelectListValues] = useState([]);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatContactToSelect } = useContactPage();
  const [openAchivedModal, setOpenAchivedModal] = useState(false);

  //* WORKING
  const [openCompletedModal, setOpenCompletedModal] = useState(false);

  //* ------ |

  const [selectedDeal, setSelectedDeal] = useState<DealTypes>({});
  const [finishedBy, setFinishedBy] = useState("");
  const [status, setStatus] = useState<StatusTypes>({});

  useEffect(() => {
    if (!deals.length) {
      getData();
    }
  }, []);

  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "company") {
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
    removefilterDeals();
    setHasFiltered(false);
    setSearchTerm("");
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
  };
  const handleClick = (deal) => {
    setFinishedBy(deal.activity[0].createdBy.name);
    setSelectedDeal(deal);
    if (deal.status === "ARCHIVED") {
      setOpenAchivedModal(true);
    } else {
      setOpenCompletedModal(true);
    }
  };

  useEffect(() => {
    if (status.type) {
      const i = deals.indexOf(selectedDeal);
      deals.splice(i, 1);
      setTimeout(() => {
        setStatus({});
      }, 3000);
    }
  }, [status]);
  return (
    <CompletedPageContainer>
      <Head>
        <title>Finalizadas | Target</title>
      </Head>

      <AchivedDealModal
        open={openAchivedModal}
        setOpen={setOpenAchivedModal}
        deal={selectedDeal}
        setStatus={setStatus}
        getDealsData={getData}
      />

      {deals && (
        <CompletedDealModal
          open={openCompletedModal}
          setOpen={setOpenCompletedModal}
          deal={selectedDeal}
          setStatus={setStatus}
          finishedBy={finishedBy}
        />
      )}
      <CompletedHeaderContainer>
        <TitleContainer>
          <Title title="NEGOCIAÇÕES FINALIZADAS"></Title>
        </TitleContainer>
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
          ]}
          ChangeType={(event) => {
            handleChangeValueType(event);
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handleChangeSearchTerm(event);
          }}
        />
      </CompletedHeaderContainer>
      <CompletedButtonsContainer>
        <BottomNavigation
          value={selectedStatus}
          onChange={handleChange}
          showLabels
        >
          <Tooltip
            title="Visualizar ganhas"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <BottomNavigationAction
              label="Ganhou"
              value="WON"
              sx={{ color: selectedStatus === "WON" && "#E2711D" }}
              icon={
                <i
                  style={{ color: selectedStatus === "WON" && "#E2711D" }}
                  className="fa fa-thumbs-up"
                ></i>
              }
            />
          </Tooltip>

          <Tooltip
            title="Visualizar perdidas"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <BottomNavigationAction
              label="Perdeu"
              value="LOST"
              sx={{ color: selectedStatus === "LOST" && "#E2711D" }}
              icon={
                <i
                  style={{ color: selectedStatus === "LOST" && "#E2711D" }}
                  className="fa fa-thumbs-down"
                ></i>
              }
            />
          </Tooltip>

          <Tooltip
            title="Visualizar arquivadas"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <BottomNavigationAction
              label="Arquivadas"
              value="ARCHIVED"
              sx={{ color: selectedStatus === "ARCHIVED" && "#E2711D" }}
              icon={
                <i
                  style={{ color: selectedStatus === "ARCHIVED" && "#E2711D" }}
                  className="fa fa-archive"
                ></i>
              }
            />
          </Tooltip>
        </BottomNavigation>
      </CompletedButtonsContainer>
      <CardsContainer>
        {deals
          .filter((deal) => deal.status === selectedStatus)
          .map((deal) => (
            <DealCompletedCard
              key={deal.id}
              title={deal.name}
              companyName={deal.company?.name}
              contactName={deal.contact?.name}
              companyPicture={deal.company?.picture}
              budget={deal.value}
              startDate={deal.createdAt}
              status={deal.status}
              style={{
                cursor: deal.status === "ARCHIVED" ? "pointer" : "",
              }}
              onClick={() => {
                // deal.status === "ARCHIVED" ? handleClick(deal) : null;
                handleClick(deal);
              }}
            />
          ))}
      </CardsContainer>
    </CompletedPageContainer>
  );
}

export default CompletedPage;

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
