import React, { useEffect, useState } from "react";
import DealsService from 'data/services/DealsService';
import CompanyService from "data/services/CompanyService";

export const useDashboardPage = () => {
  
  const [dealsByCompany, setDealsByCompany] = useState([]);

  useEffect(() => {
    if (!dealsByCompany.length) {
      getDealsByCompany();
    }
  }, []);


  const getDealsByCompany = async () => {
    const allDeals = await DealsService.getAllDeals();
    const allCompanies = await CompanyService.getCompanies();
    let companies = []

    allCompanies.map((c) => {
        const company = {
            id: c.id,
            name: c.name,
            won: 0,
            lost: 0,
            inProgress: 0,
            archived: 0
        }

        allDeals.map((d) => {
            if (d.company.id === company.id) {
                switch (d.status) {
                    case 'INPROGRESS':
                        company.inProgress += d.value;
                        break;
                    case 'LOST':
                        company.lost += d.value;
                        break;
                    case 'WON':
                        company.won += d.value;
                        break;
                    case 'ARCHIVED':
                        company.archived += d.value;
                        break;
                }
            }
        })
        companies.push(company)
    })
    setDealsByCompany(companies);
  };

  
  return {
      dealsByCompany
  };
};
