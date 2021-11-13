import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface BarChartsProps {
  series: number[];
}

const PieCharts: React.FC<BarChartsProps> = ({ series }) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        width: 700,
        type: "pie",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      colors: [
        "rgb(0, 227, 150)",
        "rgb(255, 69, 96)",
        "rgb(0, 143, 251)",
        "rgb(254, 176, 25)",
      ],
      labels: ["Ganhou", "Perdeu", "Andamento", "Arquivada"],
      responsive: [
        {
          breakpoint: 1000,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        position: "bottom",
        offsetX: -10,
      },
      title: {
        text: "Geral",
      },
      fill: {
        opacity: 1,
      },
    }),
    []
  );

  return (
    <>
      <Chart options={options} series={series} type="pie" height={600} />
    </>
  );
};

export default PieCharts;
