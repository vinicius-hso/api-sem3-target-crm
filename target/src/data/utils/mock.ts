import React from "react";
import moment from "moment";
import { DealTypes } from "types/Deal";

//DADOS FIXOS PARA RENDERIZAÇÃO DO FRONT ENQUANDO N TEM BACKEND
export const mockDeals: DealTypes[] = [
  {
    name: "Privatização",
    company: "Akahmadi",
    contact: "Jonny Cash",
    value: 247,
    tag: "hot",
    pipeline: "wonID",
  },
  {
    name: "Privatização",
    company: "Akahmadi",
    contact: "Jonny Cash",
    value: 247,
    tag: "hot",
    pipeline: "newid",
  },
  {
    name: "Privatização",
    company: "Akahmadi",
    contact: "Jonny Cash",
    value: 247,
    tag: "hot",
    pipeline: "wonID",
  },
];

export const oldMockPipes = [
  {
    title: "Won",
    _id: "wonID",
    totalColumnValue: 0,
  },
  {
    title: "Lost",
    _id: "lostid",
    totalColumnValue: 0,
  },
  {
    title: "Teste",
    _id: "testeid",
    totalColumnValue: 0,
  },
  {
    title: "Product",
    _id: "productid",
    totalColumnValue: 0,
  },
  {
    title: "New",
    _id: "newid",
    totalColumnValue: 0,
  },
  {
    title: "Greater",
    _id: "greaterid",
    totalColumnValue: 0,
  },
];

export const mockPipes = [
  {
    name: "Won",
    id: "wonID",
    totalColumnValue: 0,
  },
];

export const mockAddCard = {
  title: "teste venda",
  companyName: "kibe frito",
  companyPicture: "",
  contactName: "risole de presunto e queijo",
  budget: 2457,
  startDate: moment().format("DD/MM/YYYY HH:MM"),
  tag: "cold",
  id: "testeAdd123",
  pipe: "",
};

export const navBarRoutes = [
  { name: "Negócios", icon: "fa-bar-chart", link: "/" },
  { name: "Contatos", icon: "fa-address-book", link: "/contact" },
  { name: "Empresas", icon: "fa-building", link: "/company" },
  { name: "Usuários", icon: "fa-users", link: "/user" },
  { name: "Dashboard", icon: "fa-line-chart", link: "/dashboard" },
  { name: "Finalizadas", icon: "fa-archive", link: "/completed" },
];

export const mockTags = [
  { value: "HOT", label: "Quente" },
  { value: "COLD", label: "Frio" },
  { value: "WARM", label: "Morno" },
];

export const mockRoles = [
  { value: "ADMIN", label: "Administrador" },
  { value: "SELLER", label: "Vendedor" },
];