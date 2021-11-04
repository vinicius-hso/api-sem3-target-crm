import React, { useEffect, useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup, Box } from '@material-ui/core';
import { DynamicBarCharts } from "data/services/servicesComponents/DynamicBarCharts";
import { DynamicPieCharts } from "data/services/servicesComponents/DynamicPieCharts";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import {
  ChartsContainer,
  DashboardHeaderContainer,
  DashboardPageContainer,
  DatePickerContainer,
} from "@styles/pagesStyle/dashboard.style";
import DealsInfoCard from "../ui/components/DealsInfoCard/DealsInfoCardComponent";
import ConversionRateCard from "../ui/components/ConversionRateCardComponent/ConversionRateCardComponent";
import { useDashboardPage } from "../data/services/hooks/PageHooks/DashboardHook";
import Title from "ui/components/Title/Title";
import { formatArray } from "data/utils/formatArray";

interface BarChartsProps {
  title: string;
  xaxis: string[];
  series: { name: string; data: number[] }[];
}

function Dashboard() {
  const {
    wonDeals,
    lostDeals,
    inProgressDeals,
    archivedDeals,
    dealsInfo,
    getDealsInfo,
    conversionRateInfo,
    getConversionRateCardInfo,
    getData,
    deals,
  } = useDashboardPage();

  const [filterType, setFilterType] = useState<{
    chartType: string;
    valueType: string;
  }>({ chartType: "Empresa", valueType: "quantidade" });

  const [filterDate, setFilterDate] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: "", endDate: "" });

  const [chartData, setChartsData] = useState<BarChartsProps>({
    title: "",
    xaxis: [""],
    series: [{ name: "", data: [0] }],
  });

  useEffect(() => {
    if (!dealsInfo.meanValue) {
      getDealsInfo();
    }

    if (!conversionRateInfo.conversionRate) {
      getConversionRateCardInfo();
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getChartData = (chartType: string, valueType: string) => {
    const data = formatArray(deals, chartType);
    setChartsData({
      title: `${chartType} X ${valueType}`,
      xaxis: data?.dataNames,
      series: [
        {
          name: "GANHAS",
          data:
            valueType === "valor"
              ? data?.dataValues?.wonValue
              : data?.dataLength?.won,
        },
        {
          name: "EM ANDAMENTO",
          data:
            valueType === "valor"
              ? data?.dataValues?.inProgressValue
              : data?.dataLength?.inProgress,
        },
        {
          name: "PERDIDAS",
          data:
            valueType === "valor"
              ? data?.dataValues?.lostValue
              : data?.dataLength?.lost,
        },
      ],
    });
  };

  useEffect(() => {
    getChartData("Empresa", "quantidade");
  }, [deals]);

  const setFilter = () => {
    if (filterDate?.startDate) {
      const startDate = filterDate?.startDate
        ? new Date(filterDate?.startDate)
        : new Date("1900-11-11");
      getData(startDate);
    }
  };

  return (
    <DashboardPageContainer>
      <DashboardHeaderContainer>
        <Title style={{ textAlign: "left" }} title="Dashboard"></Title>

        <DatePickerContainer>
          <p> Personalize o grafico</p>
          <div className="buttonEditChart">
            <ToggleButtonGroup
              color="primary"
              value={filterType.chartType}
              exclusive
              onChange={(event, newValue) => {
                setFilterType({ ...filterType, chartType: newValue });
                getChartData(newValue, filterType.valueType);
              }}
            >
              <ToggleButton value="Empresa">Empresas</ToggleButton>
              <ToggleButton value="Vendedor">Vendedores</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              color="primary"
              value={filterType.valueType}
              exclusive
              onChange={(event, newValue) => {
                setFilterType({ ...filterType, valueType: newValue });
                getChartData(filterType.chartType, newValue);
              }}
            >
              <ToggleButton value={"quantidade"}>Quantidade</ToggleButton>
              <ToggleButton value={"valor"}>Valor</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="inputDateGroup">
            <TextFieldMask
              id="outlined-basic"
              variant="standard"
              size="small"
              type="date"
              value={filterDate.startDate}
              onChange={(event) => {
                setFilterDate({ ...filterDate, startDate: event.target.value });
              }}
              focused
              label="A partir de:"
            />
            <Button
              onClick={setFilter}
              variant="contained"
              color="primary"
              size="small"
              sx={{ height: "40px" }}
            >
              Filtrar data
            </Button>
          </div>
        </DatePickerContainer>
      </DashboardHeaderContainer>
      <ChartsContainer>
        <DynamicBarCharts
          series={chartData.series}
          title={chartData.title}
          xaxis={chartData.xaxis}
        />
      </ChartsContainer>
      <DynamicPieCharts
        series={[
          wonDeals.length,
          lostDeals.length,
          inProgressDeals.length,
          archivedDeals.length,
        ]}
      />
      <br />
      
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          // flexWrap: 'wrap'
          // p: 1,
          // m: -2,    
        }}>
        
          {dealsInfo && (
            <DealsInfoCard
              meanvalue={dealsInfo?.meanValue}
              totalvalue={dealsInfo?.totalValue}
              totaldeals={dealsInfo?.totalDeals}
              meandays={dealsInfo?.meanDays}
            />
          )}

          {conversionRateInfo && (
            <ConversionRateCard
              conversionrate={conversionRateInfo.conversionRate}
              totalwon={conversionRateInfo.totalWon}
              totallost={conversionRateInfo.totalLost}
              totalinprogress={conversionRateInfo.totalInProgress}
              totalarchived={conversionRateInfo.totalArchived}
            />
          )}
        
      </Box>
      
    </DashboardPageContainer>
  );
}
export default Dashboard;
