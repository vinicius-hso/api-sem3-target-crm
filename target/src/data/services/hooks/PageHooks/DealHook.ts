import { useEffect, useState } from "react";
import DealsService from "data/services/DealsService";

export const useDealPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [deals, setDeals] = useState([]);
  const [formatDealToSelect, setFormat] = useState([]);

  useEffect(() => {
    if (!deals.length) getData();
  }, []);

  const formatListToSelect = (deals: any[]): any => {
    if (deals.length) {
      setFormat(
        deals.map((deals) => {
          return { value: deals.id, label: deals.name };
        })
      );
    }
  };

  const getData = async () => {
    const response = await DealsService.getDeals();
    setDeals(response);
    formatListToSelect(response);
  };

  const editDeal = async (dealId, data) => {
    const response = await DealsService.editDeal(dealId, data);
  };

  const createActivity = async (dealId, activity) => {
    const response = await DealsService.createActivity(dealId, activity);
  };

  const updateStatus = async (dealId, newStatus) => {
    const response = await DealsService.updateStatus(dealId, newStatus);
  };

  const deletedDeal = async (dealId: string) => {
    await DealsService.deletedDeal(dealId);
  };

  const updateStatusAndRestore = async (dealId, pipelineId) => {
    const status = "INPROGRESS";
    const response = await DealsService.updateStatusAndRestore(
      dealId,
      pipelineId,
      status
    );
    return response;
  };

  return {
    deals,
    formatDealToSelect,
    createActivity,
    editDeal,
    updateStatus,
    updateStatusAndRestore,
    deletedDeal,
  };
};
