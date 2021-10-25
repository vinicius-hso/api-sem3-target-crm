import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

//FUNÇÃO QUE ADAPTA KABAN PARA O NEXT (COMPLEXO, SE QUISER ENTEDER AVISA)
const DealPipeline = dynamic(import("ui/components/Charts"));
function ChartsDinamic() {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
  return (
    <div className="pl-4 pr-4 pt-3">{winReady ? <DealPipeline /> : null}</div>
  );
}
export default ChartsDinamic;
