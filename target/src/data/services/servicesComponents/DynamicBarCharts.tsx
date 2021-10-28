import dynamic from "next/dynamic";

export const DynamicBarCharts = dynamic(
  () => import("ui/components/Charts/BarCharts/BarCharts"),
  { ssr: false }
);
