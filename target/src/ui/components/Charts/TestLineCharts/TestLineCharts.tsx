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
        // animations: {
        //   initialAnimation: {
        //     enabled: false,
        //   },
        // },
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
