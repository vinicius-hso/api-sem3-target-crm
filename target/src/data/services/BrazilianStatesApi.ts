import axios from "axios";

const brazilianApi = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

export interface IState {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

const getBrazilianStates = async (): Promise<IState[]> => {
  try {
    const brazilianStates: IState[] = await brazilianApi.get("/estados");

    return brazilianStates;
  } catch (error) {
    return error;
  }
};

export { getBrazilianStates };
