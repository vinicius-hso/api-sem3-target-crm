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
  { name: "Sair", icon: "fa-sign-out", link: "/bye" },
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

export const mockEstados = [
  { id: 1, sigla: "AC" },
  { id: 2, sigla: "AL" },
  { id: 3, sigla: "AP" },
  { id: 4, sigla: "AM" },
  { id: 5, sigla: "BA" },
  { id: 6, sigla: "CE" },
  { id: 7, sigla: "DF" },
  { id: 8, sigla: "ES" },
  { id: 9, sigla: "GO" },
  { id: 10, sigla: "MA" },
  { id: 11, sigla: "MT" },
  { id: 12, sigla: "MS" },
  { id: 13, sigla: "MG" },
  { id: 14, sigla: "PA" },
  { id: 15, sigla: "PB" },
  { id: 16, sigla: "PR" },
  { id: 17, sigla: "PE" },
  { id: 18, sigla: "PI" },
  { id: 19, sigla: "RJ" },
  { id: 20, sigla: "RN" },
  { id: 21, sigla: "RS" },
  { id: 22, sigla: "RO" },
  { id: 23, sigla: "RR" },
  { id: 24, sigla: "SC" },
  { id: 25, sigla: "SP" },
  { id: 26, sigla: "SE" },
  { id: 27, sigla: "TO" },
];

const mock = [
  {
    value: 131542,
    status: "WON",
    updatedAt: "2021-11-01T17:38:44.873Z",
  },
  {
    value: 231343,
    status: "WON",
    updatedAt: "2021-11-02T17:38:44.873Z",
  },
  {
    value: 312761,
    status: "WON",
    updatedAt: "2021-11-03T17:38:44.873Z",
  },
  {
    value: 459832,
    status: "WON",
    updatedAt: "2021-11-04T17:38:44.873Z",
  },
  {
    value: 112122,
    status: "WON",
    updatedAt: "2021-11-05T17:38:44.873Z",
  },
  {
    value: 231342,
    status: "WON",
    updatedAt: "2021-11-05T17:38:44.873Z",
  },
  {
    value: 546432,
    status: "LOST",
    updatedAt: "2021-11-01T17:38:44.873Z",
  },
  {
    value: 345354,
    status: "LOST",
    updatedAt: "2021-11-02T17:38:44.873Z",
  },
  {
    value: 226512,
    status: "LOST",
    updatedAt: "2021-11-03T17:38:44.873Z",
  },
  {
    value: 453113,
    status: "LOST",
    updatedAt: "2021-11-04T17:38:44.873Z",
  },
  {
    value: 212772,
    status: "LOST",
    updatedAt: "2021-11-05T17:38:44.873Z",
  },
];

const x = [
  "November 5, 2021",
  "November 6, 2021",
  "November 7, 2021",
  "November 8, 2021",
  "November 9, 2021",
  "November 11, 2021",
  "November 12, 2021",
  "November 13, 2021",
  "November 14, 2021",
  "November 15, 2021",
  "November 16, 2021",
  "November 17, 2021",
];

const s = [
  {
    name: "Ganha",
    data: [
      2432, 4654, 5912, 4342, 5982, 7354, 3370, 6609, 9904, 1323, 5434, 8767,
    ],
  },
  {
    name: "Perdida",
    data: [
      3301, 6660, 9990, 1323, 5434, 8767, 3432, 6654, 9912, 4342, 5982, 7354,
    ],
  },
];
