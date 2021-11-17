import { useState } from "react";
import DealsService from "data/services/DealsService";

export const useCompletedPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [deals, setDeals] = useState([]);
  const [removeFilteredDeals, setFilteredDeals] = useState([]);

  const getData = async () => {
    if (deals?.length) return;
    const response = await DealsService.getDealsCompleted();
    setDeals(response);
    setFilteredDeals(response);
  };

  const filterDeals = (
    value: string,
    typeValue: string,
    resetFilter: boolean
  ) => {
    let list = deals;
    if (resetFilter) list = [...removeFilteredDeals];
    const tempDeals = [];
    list.forEach((deal) => {
      if (deal.name.toLowerCase().includes(value.toLocaleLowerCase())) {
        tempDeals.push(deal);
      } else {
        switch (typeValue) {
          case "contact":
            if (deal.contact.id.includes(value)) {
              tempDeals.push(deal);
            }
            break;
          case "company":
            if (deal.company.id.includes(value)) {
              tempDeals.push(deal);
            }
            break;
          case "tag":
            if (deal.activity[deal.activity.length - 1].tag.includes(value)) {
              tempDeals.push(deal);
            }
            break;
        }
      }
    });
    setDeals(tempDeals);
  };

  const removefilterDeals = () => {
    getData();
  };

  return {
    deals,
    getData,
    filterDeals,
    removefilterDeals,
  };
};
