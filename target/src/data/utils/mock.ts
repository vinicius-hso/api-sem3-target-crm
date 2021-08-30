import moment from "moment";
import React from "react";

export const mockDeals = [
  {
    title: "Privatização",
    companyName: "coxinha",
    companyPicture:
      "https://media-exp1.licdn.com/dms/image/C560BAQFqVWwqk5C09Q/company-logo_200_200/0/1570541145129?e=2159024400&v=beta&t=V_YoQCobHzn9rQZgLOZ_PA5cm-uVuNKXfmtk7QdhXzs",
    contactName: "coxinha frita",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "hot",
    id: "kfdjs",
    content: "0",
  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "esfiha assada",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "warm",
    id: "fdsgdsa",
    content: "0",
  },
  {
    title: "mockadão",
    companyName: "risole",
    companyPicture:
      "https://st3.depositphotos.com/9680206/15298/v/600/depositphotos_152989372-stock-illustration-joint-letters-ap-logo.jpg",
    contactName: "frando empanado",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "gsmkjos",
    content: "0",
  },
];

export const mockPipes = [
  {
    content: "won",
    title: "won",
    id: "wocdsn",
    cards: [mockDeals[0], mockDeals[1]],
  },
  {
    content: "lost",
    title: "lost",
    id: "lofdsst",
    cards: [mockDeals[2]],
  },
];
