import { useState } from "react";
import DealsService from "data/services/DealsService";
import CompanyService from "data/services/CompanyService";
import { formatValue } from "../../../utils/formatValue";
import { DealsInfoCardTypes } from "../../../../types/DealsInfoCard";
import { ConversionRateInfoCardTypes } from "../../../../types/ConversionRateInfoCard";
import moment from "moment";

export const useDashboardPage = () => {
  const [dealsByCompany, setDealsByCompany] = useState([]);
  const [deals, setDeals] = useState([]);
  const [wonDeals, setWonDeals] = useState([]);
  const [lostDeals, setLostDeals] = useState([]);
  const [inProgressDeals, setInProgressDeals] = useState([]);
  const [archivedDeals, setArchivedDeals] = useState([]);
  const [dealsInfo, setDealsInfo] = useState<DealsInfoCardTypes>(
    {} as DealsInfoCardTypes
  );
  const [conversionRateInfo, setConversionRateInfo] =
    useState<ConversionRateInfoCardTypes>({} as ConversionRateInfoCardTypes);

  const getData = async (startDate?: Date) => {
    let query = "";
    if (startDate) {
      query = `&createdAt__gte=${startDate.toISOString()}`;
    }

    const won = [];
    const lost = [];
    const inProgress = [];
    const archived = [];
    const deals = await DealsService.getTotslDeals(query);

    if (deals?.length) {
      deals.forEach((deal) => {
        switch (deal.status) {
          case "WON":
            won.push(deal);
            break;
          case "LOST":
            lost.push(deal);
            break;
          case "INPROGRESS":
            inProgress.push(deal);
            break;
          case "ARCHIVED":
            archived.push(deal);
            break;
          default:
            break;
        }
      });
      setWonDeals(won);
      setLostDeals(lost);
      setArchivedDeals(archived);
      setInProgressDeals(inProgress);
      setDeals(deals);
    }
  };

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
    function diffDays(endDate: Date, startDate: Date) {
      let diff = moment(startDate, "YYYY-MM-DDTHH:mm:ssZ").diff(
        moment(endDate, "YYYY-MM-DDTHH:mm:ssZ")
      );
      let days = moment.duration(diff).asDays();
      return days;
    }

    const allDeals = await DealsService.getAllDeals();

    let totalDeals = allDeals?.length;
    let totalDays = 0;
    let totalWons = 0;
    let totalValue = 0;

    if (allDeals?.length) {
      allDeals.map((d) => {
        totalValue += d.value;
        if (d.status === "WON") {
          totalWons += 1;
          totalDays += diffDays(d.updatedAt, d.createdAt);
        }
      });

      let meanDays = totalDays / totalWons;
      if (meanDays < 0) {
        meanDays = meanDays * -1;
      }
      let meanValue = totalValue / totalDeals;

      setDealsInfo({
        meanValue: formatValue(meanValue),
        totalValue: formatValue(totalValue),
        totalDeals: totalDeals.toString(),
        meanDays: meanDays.toFixed(2).toString(),
      });
    }
  };

  const getConversionRateCardInfo = async () => {
    const allDeals = await DealsService.getAllDeals();

    let totalWon = 0;
    let totalLost = 0;
    let totalInProgress = 0;
    let totalArchived = 0;

    if (allDeals?.length) {
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
          default:
            break;
        }
      });

      setConversionRateInfo({
        conversionRate: Number(
          ((totalWon / allDeals?.length) * 100).toFixed(2)
        ),
        totalWon,
        totalLost,
        totalInProgress,
        totalArchived,
      });
    }
  };

  return {
    dealsByCompany,
    dealsInfo,
    conversionRateInfo,
    getDealsByCompany,
    getDealsInfo,
    getConversionRateCardInfo,
    getData,
    deals,
    wonDeals,
    lostDeals,
    inProgressDeals,
    archivedDeals,
  };
};
