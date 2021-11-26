import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { DealTypes } from "types/Deal";

interface BarChartsProps {
  deals: DealTypes[];
}

const PieCharts: React.FC<BarChartsProps> = ({ deals }) => {
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

  const seriesPie = useMemo(() => {
    if (deals?.length) {
      const series = [0, 0, 0, 0];
      deals.forEach((deal) => {
        switch (deal.status) {
          case "WON":
            return series[0]++;
          case "LOST":
            return series[1]++;
          case "INPROGRESS":
            return series[2]++;
          case "ARCHIVED":
            return series[3]++;
        }
      });
      return series;
    } else {
      return [0, 0, 0, 0];
    }
  }, [deals]);

  return (
    <>
      <Chart options={options} series={seriesPie} type="pie" height={600} />
    </>
  );
};

export default PieCharts;
