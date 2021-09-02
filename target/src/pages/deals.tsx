import React from "react";
import ScrumBoard from "data/services/servicesComponents/ScrumBoard";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { CircularProgress } from "@material-ui/core";

function DealPipeline() {
  const { hasError, isLoading } = usePipelineComponent();
  return (
    <div>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <ScrumBoard />
        )}
      </div>
    </div>
  );
}

export default DealPipeline;
