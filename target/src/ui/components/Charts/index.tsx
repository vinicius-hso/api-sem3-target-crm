import React, { useState } from "react";
import Chart from "react-apexcharts";
//AINDA N ESTA EM USO... APENAS PARA TESTE DE LAYOUT

function Charts() {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      name: "year",
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  });

  const [series, setSeries] = useState([
    {
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);
  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
export default Charts;
