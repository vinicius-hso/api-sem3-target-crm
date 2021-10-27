import moment from "moment";
import React, { useState } from "react";
import Chart from "react-apexcharts";
//AINDA N ESTA EM USO... APENAS PARA TESTE DE LAYOUT

const date = moment().format("MMM");

const options = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    name: "Mês",
    categories: [
      ["John", "Doe"],
      ["Joe", "Smith"],
      ["Jake", "Williams"],
      "Amber",
      ["Peter", "Brown"],
      ["Mary", "Evans"],
      ["David", "Wilson"],
      ["Lily", "Roberts"],
    ],
  },
};

const series = [
  {
    name: "GANHAS",
    data: [4, 5, 1, 7, 2, 5, 1, 2],
  },
  {
    name: "EM ANDAMENTO",
    data: [3, 3, 2, 8, 3, 4, 7, 2],
  },
  {
    name: "PERDIDAS",
    data: [1, 7, 5, 5, 5, 1, 7, 9],
  },
];

function ChartsMoney() {
  return (
    <div id="chart">
      {window && (
        <>
          <Chart options={options} series={series} type="bar" height={350} />
        </>
      )}
    </div>
  );
}
export default ChartsMoney;
