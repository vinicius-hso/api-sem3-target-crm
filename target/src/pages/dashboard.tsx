import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/core";
import { DynamicBarCharts } from "data/services/servicesComponents/DynamicBarCharts";
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
    dealsInfo,
    getDealsInfo,
    conversionRateInfo,
    getConversionRateCardInfo,
    getData,
    deals,
  } = useDashboardPage();

  const [filterType, setFilterType] = useState<{
    chartType: string;
    valueType: boolean;
  }>({ chartType: "Empresa", valueType: false });

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

  const getChartData = (chartType: string, valueType: boolean) => {
    const data = formatArray(deals, chartType);
    setChartsData({
      title: `${chartType} X ${valueType ? "Valor" : "Quantidade"}`,
      xaxis: data?.dataNames,
      series: [
        {
          name: "GANHAS",
          data: valueType ? data?.dataValues?.wonValue : data?.dataLength?.won,
        },
        {
          name: "EM ANDAMENTO",
          data: valueType
            ? data?.dataValues?.inProgressValue
            : data?.dataLength?.inProgress,
        },
        {
          name: "PERDIDAS",
          data: valueType
            ? data?.dataValues?.lostValue
            : data?.dataLength?.lost,
        },
      ],
    });
  };

  useEffect(() => {
    getChartData("Empresa", true);
  }, [deals]);

  useEffect(() => {
    if (filterDate?.startDate) {
      const startDate = filterDate?.startDate
        ? new Date(filterDate?.startDate)
        : new Date(Date.now());
      const endDate = filterDate?.endDate
        ? new Date(filterDate?.endDate)
        : new Date(Date.now());

      getData(startDate, endDate);
    }
  }, [filterDate?.startDate, filterDate?.endDate]);

  return (
    <DashboardPageContainer>
      <DashboardHeaderContainer>
        <Title style={{ textAlign: "left" }} title="Dashboard"></Title>

        <DatePickerContainer>
          <p> Personalize o grafico</p>
          <div className="buttonEditChart">
            <ToggleButtonGroup
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
              <ToggleButton value={false}>Quantidade</ToggleButton>
              <ToggleButton value={true}>Valor</ToggleButton>
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
              label="Data inicial"
            />
            {/*             <TextFieldMask
              id="outlined-basic"
              variant="standard"
              size="small"
              type="date"
              label="Data final"
              value={filterDate.endDate}
              onChange={(event) => {
                setFilterDate({ ...filterDate, endDate: event.target.value });
              }}
              focused
            />
 */}{" "}
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
    </DashboardPageContainer>
  );
}
export default Dashboard;
