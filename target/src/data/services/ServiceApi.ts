import axios from "axios";

//DECLARA O AXIOS PARA USAR O BACK END NA PORTA 3333 OU EM UMA PASSA POR PROD
export const serviceApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3333",
});
