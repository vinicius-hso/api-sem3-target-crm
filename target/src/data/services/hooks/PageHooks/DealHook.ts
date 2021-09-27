import React, { useEffect, useState } from "react";
import DealsService from 'data/services/DealsService';

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
  }
  const getData = async () => {
    const response = await DealsService.getDeals();
    setDeals(response);
    formatListToSelect(response);
  };
  return {
    deals,
    formatDealToSelect,
  };
};
