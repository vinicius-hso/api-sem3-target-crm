import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/ServiceApi";
import { mockDeals, mockPipes } from "data/utils/mock";
import { formatValue } from "data/utils/formatValue";
import { DealTypes } from "types/Deal";
import { toast } from "react-toastify";

export const usePipelineComponent = () => {
  const [pipelines, setPipelines] = useState<any[]>([]),
    [isLoading, setLoading] = useState(false);

  async function getData() {
    if (pipelines.length) return;
    setLoading(false);
    try {
      const { data } = await serviceApi.get("pipeline");
      setPipelines(data);
    } catch (err) {
      toast.error(
        "Ops! algo deu errado, verifique sua conexão e tente novamente."
      );
    }
  }

  return {
    pipelines,
    isLoading,
    getData,
  };
};
