import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import { Button, ButtonGroup } from "@material-ui/core";
import { DynamicBarCharts } from "data/services/servicesComponents/DynamicBarCharts";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { DatePickerContainer } from "@styles/pagesStyle/dashboard.style";
import DealsInfoCard from "../ui/components/DealsInfoCard/DealsInfoCardComponent";
import ConversionRateCard from "../ui/components/ConversionRateCardComponent/ConversionRateCardComponent";
import { useDashboardPage } from "../data/services/hooks/PageHooks/DashboardHook";
import { useEffect } from "react";
import { Teste } from "data/services/importContactService";

function Dashboard() {
  const {
    dealsInfo,
    getDealsInfo,
    conversionRateInfo,
    getConversionRateCardInfo,
  } = useDashboardPage();
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (!dealsInfo.meanValue) {
      getDealsInfo();
    }

    if (!conversionRateInfo.conversionRate) {
      getConversionRateCardInfo();
    }
  }, []);

  const series = [
    {
      name: "GANHAS",
      data: [2, 6, 5, 4],
    },
    {
      name: "EM ANDAMENTO",
      data: [4, 3, 8, 7],
    },
    {
      name: "PERDIDAS",
      data: [5, 8, 7, 6],
    },
  ];

  const xaxis = ["maria", "joão", "jose", "marcia"];

  const teste = async (file) => {
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

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          setFile(event.target.files[0]);
          teste(event.target.files[0]);
        }}
      />
      <DynamicBarCharts
        series={series}
        title="Negociações por Empresa"
        xaxis={xaxis}
      />
      <DatePickerContainer>
        <ButtonGroup variant="contained" aria-label="outlined button group">
          <Button>Empresa</Button>
          <Button>Geral</Button>
          <Button>Vendedor</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" aria-label="text button group">
          <Button>Quantidade</Button>
          <Button>Valor</Button>
        </ButtonGroup>
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
      </DatePickerContainer>

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
    </>
  );
}
export default Dashboard;
