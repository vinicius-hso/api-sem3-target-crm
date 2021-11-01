import React, { useState } from "react";
import DealsService from "data/services/DealsService";
import CompanyService from "data/services/CompanyService";
import { formatValue } from "../../../utils/formatValue";
import { DealsInfoCardTypes } from '../../../../types/DealsInfoCard';
import { ConversionRateInfoCardTypes } from '../../../../types/ConversionRateInfoCard';

export const useDashboardPage = () => {
  
  const [dealsByCompany, setDealsByCompany] = useState([]);
  const [dealsInfo, setDealsInfo] = useState<DealsInfoCardTypes>({} as DealsInfoCardTypes);
  const [conversionRateInfo, setConversionRateInfo] = useState<ConversionRateInfoCardTypes>({} as ConversionRateInfoCardTypes);

  const getDealsByCompany = async () => {
    const allDeals = await DealsService.getAllDeals();
    const allCompanies = await CompanyService.getCompanies();
    let companies = [];

    allCompanies.map((c) => {
      const company = {
        id: c.id,
        name: c.name,
        won: 0,
        lost: 0,
        inProgress: 0,
        archived: 0,
      };

      allDeals.map((d) => {
        if (d.company.id === company.id) {
          switch (d.status) {
            case "INPROGRESS":
              company.inProgress += d.value;
              break;
            case "LOST":
              company.lost += d.value;
              break;
            case "WON":
              company.won += d.value;
              break;
            case "ARCHIVED":
              company.archived += d.value;
              break;
          }
        }
      });
      companies.push(company);
    });
    setDealsByCompany(companies);
  };

  const getDealsInfo = async () => {
    const allDeals = await DealsService.getAllDeals();
    // console.log(allDeals);
    let totalDeals = allDeals.length;

    let totalValue = 0;
    allDeals.map((d) => {
      totalValue += d.value;
    });

    let meanValue = totalValue / totalDeals;

    setDealsInfo({
      meanValue: formatValue(meanValue.toFixed(2).toString()),
      totalValue: formatValue(totalValue.toFixed(2).toString()),
      totalDeals: totalDeals.toString(),
    });

  };

  const getConversionRateCardInfo = async () => {
    const allDeals = await DealsService.getAllDeals();

    let totalWon = 0;
    let totalLost = 0;
    let totalInProgress = 0;
    let totalArchived = 0;

    allDeals.map((d) => {
      switch (d.status) {
        case "WON":
          totalWon += 1;
          break;
        case "LOST":
          totalLost += 1;
          break;
        case "INPROGRESS":
          totalInProgress += 1;
          break;
        case "ARCHIVED":
          totalArchived += 1;
          break;
      }
    });

    setConversionRateInfo({
      conversionRate: (totalWon / allDeals.length) * 100,
      totalWon,
      totalLost,
      totalInProgress,
      totalArchived,
    });

  };

  return {
    dealsByCompany,
    dealsInfo,
    conversionRateInfo,
    getDealsByCompany,
    getDealsInfo,
    getConversionRateCardInfo
  };
};
