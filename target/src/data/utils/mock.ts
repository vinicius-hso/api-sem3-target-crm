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
    id: "teste2",
    content: "teste 2",
    prefix: 0,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "data:image/jpeg;base64,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",
    contactName: "esfiha assada",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "warm",
    id: "teste1",
    content: "teste 1",
    prefix: 1,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste3",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste4",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste5",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste6",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste7",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste8",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste9",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste10",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste11",
    content: "teste 3",
    prefix: 2,

  },
  {
    title: "teste venda",
    companyName: "kibe",
    companyPicture:
      "https://www.hypeness.com.br/1/2018/03/uber-8.png",
    contactName: "risole de presunto e queijo",
    type: "teste",
    budget: 2457,
    startDate: moment().format("DD/MM/YYYY HH:MM"),
    tag: "cold",
    id: "teste12",
    content: "teste 3",
    prefix: 2,

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
  {
    content: "test",
    title: "test",
    id: "lofdsstfdsaf",
    cards: [mockDeals[3]],
  },
];
