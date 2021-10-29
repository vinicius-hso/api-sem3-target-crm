import React, { useState } from "react";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import { DynamicBarCharts } from "data/services/servicesComponents/DynamicBarCharts";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";

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
      <Box>
        <ButtonGroup variant="contained" aria-label="outlined button group">
          <Button>Empresa</Button>
          <Button>Geral</Button>
          <Button>Vendedor</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" aria-label="text button group">
          <Button>Quantidade</Button>
          <Button>Valor</Button>
        </ButtonGroup>
        data inicia
        <TextFieldMask
          id="outlined-basic"
          variant="standard"
          size="small"
          type="date"
        />
        data final
        <TextFieldMask
          id="outlined-basic"
          variant="standard"
          size="small"
          type="date"
        />
      </Box>
    </>
  );
}
export default Dashboard;
