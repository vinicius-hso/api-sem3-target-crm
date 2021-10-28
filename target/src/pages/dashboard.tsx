import { DynamicBarCharts } from "data/services/servicesComponents/DynamicBarCharts";
import React, { useState } from "react";

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
    <DynamicBarCharts
      series={series}
      title="Negociações por Empresa"
      xaxis={xaxis}
    />
  );
}
export default Dashboard;
