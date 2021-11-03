import dynamic from "next/dynamic";

export const DynamicPieCharts = dynamic(
  () => import("ui/components/Charts/PieCharts/PieCharts"),
  { ssr: false }
);
