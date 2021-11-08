import dynamic from "next/dynamic";

export const DynamicTestLineCharts = dynamic(
  () => import("ui/components/Charts/TestLineCharts/TestLineCharts"),
  { ssr: false }
);
