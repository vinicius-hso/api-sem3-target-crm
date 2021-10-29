import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface BarChartsProps {
  title: string;
  xaxis: string[];
  series: { name: string; data: number[] }[];
}

const StackedColumnChart: React.FC<BarChartsProps> = ({
  series,
  xaxis,
  title,
}) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 350,
        width: "100%",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
        },
      },
      title: {
        text: title,
      },
      xaxis: {
        type: "category",
        categories: xaxis,
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    }),
    [title, xaxis]
  );

  return (
    <>
      <Chart options={options} series={series} type="bar" height={350} />
    </>
  );
};

export default StackedColumnChart;
