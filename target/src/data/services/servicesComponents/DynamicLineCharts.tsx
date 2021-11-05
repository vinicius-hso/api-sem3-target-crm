import dynamic from "next/dynamic";

export const DynamicLineCharts = dynamic(
  () => import("ui/components/Charts/LineCharts/LineCharts"),
  { ssr: false }
);
