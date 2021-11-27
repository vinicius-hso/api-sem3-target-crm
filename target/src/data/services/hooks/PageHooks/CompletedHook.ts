import { useState } from "react";
import DealsService from "data/services/DealsService";

export const useCompletedPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [deals, setDeals] = useState([]);
  const [removeFilteredDeals, setFilteredDeals] = useState([]);
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await DealsService.getDealsCompleted();
      setDeals(response);
      setFilteredDeals(response);
      setLoading(false);
    } catch (err) {
      setError(
        "Não foi possivel buscar as nogociações, verifique sua conexão e tente novamente"
      );
      setLoading(false);
    }
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
    hasError,
    isLoading,
  };
};
