import dynamic from "next/dynamic";

export const DynamicPiline = dynamic(
  () => import("ui/components/DealComponents/DealPipeline/DealPipeline"),
  { ssr: false }
);
