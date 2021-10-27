import moment from "moment";
import React, { useState } from "react";
import Chart from "react-apexcharts";
//AINDA N ESTA EM USO... APENAS PARA TESTE DE LAYOUT

const date = moment().format("MMM");

const options = { labels: ["ganha", "perdida", "em andamento"] };
const series = [4, 5, 6];

function ChartsMoney() {
  return (
    <div id="chart">
      {window && (
        <>
          <Chart options={options} series={series} type="pie" height={350} />
        </>
      )}
    </div>
  );
}
export default ChartsMoney;
