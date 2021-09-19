import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/serviceApi";
import { mockDeals, mockPipes } from "data/utils/mock";
import { formatValue } from "data/utils/formatValue";
import { DealTypes } from "types/Deal";

export const usePipelineComponent = () => {
  // DECLARAÇÃO DAS VARIAVEIS
  const [pipelines, setPipe] = useState([]),
    [deals, setDeal] = useState<DealTypes[]>([]),
    [hasError, setError] = useState(""),
    [isLoading, setLoading] = useState(false);

  //EXECUTA ASSIM QUE ENTRA NA TELA
  useEffect(() => {
    if (pipelines.length) {
      setElements(generateDealsList());
    }
  }, [pipelines.length]);

  //BUSCA NO BACKEND OS DEALS E PIPELINES, SE HOUVER ERRO SETA NA VARIAVEL HASERROR
  async function getData() {
    setError("");
    setLoading(true);
    try {
      const pipelinesData = await serviceApi.get("/pipeline");
      const dealsData = await serviceApi.get("/deal");
      setLoading(false);
      setPipe(pipelinesData.data);
      setDeal(dealsData.data);
    } catch (err) {
      setLoading(false);
      setError(""); //COLOCAR ERRO DEPOIS DE CONFIGURAR BACK: Erro ao carregar, verifique sua conexão e tente novamente!
    }
  }

  // RETORNA AS INFOS SOBRE AS DEALSs
  const getDealsInfo = () => {
    let budgetSum = 0,
      totalDeals = 0,
      hotDeals = 0,
      warmDeals = 0,
      coldDeals = 0;
    deals.map((deal) => {
      budgetSum += Number(deal.value);
      totalDeals += 1;
      if (deal.tag == "hot") hotDeals += 1;
      else if (deal.tag == "cold") coldDeals += 1;
      else if (deal.tag === "warm") warmDeals += 1;
    });
    const dealsInfo = {
      budgetSum: formatValue(budgetSum.toString()),
      totalDeals: totalDeals,
      hotDeals: hotDeals,
      warmDeals: warmDeals,
      coldDeals: coldDeals,
    };
    return dealsInfo;
  };

  //FILTRA OS PIPELINES
  const getItems = (pipeId) => {
    const pipeDeals = [];
    const currentPipe = pipelines.find((p) => p.id === pipeId);
    currentPipe.totalColumnValue = 0;
    deals.map((d) => {
      if (d.pipeline === pipeId) {
        pipeDeals.push(d);
        currentPipe.totalColumnValue += Number(d.value);
      }
    });

    return pipeDeals;
  };

  //FUNÇÃO QUE REMOVE DEAL DO PIPELINE (APENAS KAMBAN)
  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  //FUNÇÃO QUE ADICIONA DEAL AO PIPELINE (APENAS KAMBAN)
  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  //UNI AS DEALS AOS PIPELINES
  const generateDealsList = () => {
    return pipelines.reduce(
      (acc, listKey) => ({ ...acc, [listKey.id]: getItems(listKey.id) }),
      {}
    );
  };
  const [dealsList, setElements] = React.useState(generateDealsList());

  //FUNÇÃO BASE DO KAMBAN
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...dealsList };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setElements(listCopy);
  };

  return {
    setPipe,
    setDeal,
    pipelines,
    dealsList,
    onDragEnd,
    hasError,
    isLoading,
    getDealsInfo,
    getItems,
  };
};
