import React, { useEffect, useState } from "react";
import DealsService from "data/services/DealsService";

export const useDealPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [deals, setDeals] = useState([]);
  const [formatDealToSelect, setFormat] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const formatListToSelect = (deals: any[]): any => {
    setFormat(
      deals.map((deals) => {
        return { value: deals.id, label: deals.name };
      })
    );
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

  return {
    deals,
    formatDealToSelect,
    createActivity,
    editDeal,
    updateStatus,
  };
};
