import React, { useEffect, useState } from "react";
import DealsService from 'data/services/DealsService';
import CompanyService from "data/services/CompanyService";
import { formatValue } from '../../../utils/formatValue';

export const useDashboardPage = () => {
  
  const [dealsByCompany, setDealsByCompany] = useState([]);
  const [dealsInfo, setDealsInfo] = useState({
    meanValue: '',
    totalValue: '',
    totalDeals: ''
  });

  useEffect(() => {
    if (!dealsByCompany.length) {
      // getDealsByCompany();
      getDealsInfo();
    }
    
  }, []);


  // const getDealsByCompany = async () => {
  //   const allDeals = await DealsService.getAllDeals();
  //   const allCompanies = await CompanyService.getCompanies();
  //   let companies = []

  //   allCompanies.map((c) => {
  //       const company = {
  //           id: c.id,
  //           name: c.name,
  //           won: 0,
  //           lost: 0,
  //           inProgress: 0,
  //           archived: 0
  //       }

  //       allDeals.map((d) => {
  //           if (d.company.id === company.id) {
  //               switch (d.status) {
  //                   case 'INPROGRESS':
  //                       company.inProgress += d.value;
  //                       break;
  //                   case 'LOST':
  //                       company.lost += d.value;
  //                       break;
  //                   case 'WON':
  //                       company.won += d.value;
  //                       break;
  //                   case 'ARCHIVED':
  //                       company.archived += d.value;
  //                       break;
  //               }
  //           }
  //       })
  //       companies.push(company)
  //   })
  //   setDealsByCompany(companies);
  // };

  const getDealsInfo = async () => {
    const allDeals = await DealsService.getAllDeals();
    let totalDeals = Object.keys(allDeals).length;

    let totalValue = 0;
    allDeals.map((d) => {
      totalValue += d.value;
      console.log(d)
    })

    let meanValue = (totalValue/totalDeals);

    setDealsInfo({
      meanValue: formatValue(meanValue.toFixed(2).toString()),
      totalValue: formatValue(totalValue.toFixed(2).toString()),
      totalDeals: totalDeals.toString()
    })
    
  }
  
  return {
      dealsByCompany,
      dealsInfo
  };
};
