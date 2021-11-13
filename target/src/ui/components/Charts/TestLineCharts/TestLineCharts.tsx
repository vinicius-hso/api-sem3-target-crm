import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface TestLineChartsProps {
  series: any[];
  //   xaxis: any[];
}

const TestLineCharts: React.FC<TestLineChartsProps> = ({ series }) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        height: 380,
        width: "100%",
        type: "area",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
        // animations: {
        //   initialAnimation: {
        //     enabled: false,
        //   },
        // },
      },
      title: {
        text: "Negociações por período",
        align: "left",
      },
      colors: ["rgb(0, 227, 150)", "rgb(255, 69, 96)"],
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        type: "datetime",
      },
    }),
    []
  );

  return (
    <>
      <Chart options={options} series={series} type="area" height={500} />
    </>
  );
};

export default TestLineCharts;
