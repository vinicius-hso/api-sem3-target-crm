import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartsProps {
  series: any[];
  xaxis: any[];
}

const LineCharts: React.FC<LineChartsProps> = ({ series, xaxis }) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      colors: ["#03f518", "#e63706"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Negociações por período",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        type: "datetime",
        categories: xaxis,
      },
      yaxis: {
        title: {
          text: "Valor R$",
        },
      },
    }),
    []
  );

  return (
    <>
      <Chart options={options} series={series} type="line" height={500} />
    </>
  );
};

export default LineCharts;
