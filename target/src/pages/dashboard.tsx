import React, { useState } from "react";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import { DynamicBarCharts } from "data/services/servicesComponents/DynamicBarCharts";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { DatePickerContainer } from "@styles/pagesStyle/dashboard.style";

function Dashboard() {
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
  return (
    <>
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
    </>
  );
}
export default Dashboard;
