import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import { Button, ButtonGroup } from "@material-ui/core";
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
import { Teste } from "data/services/importContactService";
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
      xaxis: data.dataNames,
      series: [
        {
          name: "GANHAS",
          data: valueType ? data.dataValues.wonValue : data.dataLength.won,
        },
        {
          name: "EM ANDAMENTO",
          data: valueType
            ? data.dataValues.inProgressValue
            : data.dataLength.inProgress,
        },
        {
          name: "PERDIDAS",
          data: valueType ? data.dataValues.lostValue : data.dataLength.lost,
        },
      ],
    });
  };

  useEffect(() => {
    getChartData("Empresa", true);
  }, [deals]);

  /*   const teste = async (file) => {
    const errors = [];
    await readXlsxFile(file).then((rows) => {
      rows.splice(0, 1);
      rows.forEach(async (row) => {
        const contact = {
          name: row[0],
          email: row[1],
          phone: row[2],
        };
        const err = await Teste(contact);
        if (err) {
          errors.push(contact);
        }
      });
    });
    console.log(errors);
  };
 */
  return (
    <DashboardPageContainer>
      <DashboardHeaderContainer>
        <Title title="Dashboard"></Title>

        <DatePickerContainer>
          Personalize o grafico
          <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button>Empresa</Button>
            <Button>Geral</Button>
            <Button>Vendedor</Button>
          </ButtonGroup>
          <ButtonGroup variant="contained" aria-label="text button group">
            <Button>Quantidade</Button>
            <Button>Valor</Button>
          </ButtonGroup>
          <div className="inputDateGroup">
            <TextFieldMask
              id="outlined-basic"
              variant="standard"
              size="small"
              type="date"
              focused
              label="Data inicial"
            />
            <TextFieldMask
              id="outlined-basic"
              variant="standard"
              size="small"
              type="date"
              label="Data final"
              focused
            />
          </div>
        </DatePickerContainer>
      </DashboardHeaderContainer>
      {/*       <input
        type="file"
        onChange={(event) => {
          setFile(event.target.files[0]);
          teste(event.target.files[0]);
        }}
      />
 */}
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
