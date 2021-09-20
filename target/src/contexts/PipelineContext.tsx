import DealsService from "data/services/DealsService";
import PipelineService from "data/services/PipelineService";
import { formatValue } from "data/utils/formatValue";
import React, { useState, createContext, useEffect } from "react";
import { DealTypes } from "types/Deal";
import ModalTypes, { pipeline } from "types/Modal";

const PipelineContext = createContext<ModalTypes>({} as ModalTypes);

export const ModalProvider: React.FC = ({ children }) => {
  const [createModalState, setCreateModalState] = useState<boolean>(false);
  const [updateModalState, setUpdateModalState] = useState<boolean>(false);
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false);
  const [createDealModalState, setCreateDealModalState] =
    useState<boolean>(false);
  const [updateId, setUpdateIdState] = useState<string>();
  const [deleteId, setDeleteIdState] = useState<string>();
  const [name, setNameState] = useState<string>();
  const [deals, setDeals] = useState<DealTypes[]>([]);
  const [pipelines, setPipelines] = useState<pipeline[]>();
  const [pipeline, setPipeline] = useState<pipeline>();

  //FILTRA OS PIPELINES
  const getItems = (pipeId, deals, pipelines) => {
    const pipeDeals = [];
    const currentPipe = pipelines.find((p) => p.id === pipeId);
    currentPipe.totalColumnValue = 0;
    deals.map((d) => {
      if (d.pipeline.id === pipeId) {
        pipeDeals.push(d);
        currentPipe.totalColumnValue += Number(d.value);
      }
    });
    return pipeDeals;
  };

  //UNI AS DEALS AOS PIPELINES
  const generateDealsList = (pipelines, deals): any[] => {
    return pipelines.reduce(
      (acc, listKey) => ({
        ...acc,
        [listKey.id]: {
          name: listKey.name,
          id: listKey.id,
          deals: getItems(listKey.id, deals, pipelines),
          totalColumnValue: listKey.totalColumnValue,
        },
      }),
      {}
    );
  };

  const [dealsList, setElements] = React.useState([]);

  const useCreateModal = () => {
    setCreateModalState(!createModalState);
  };

  const useCreateDealModal = () => {
    setCreateDealModalState(!createDealModalState);
  };

  const useUpdateModal = (id: string) => {
    setUpdateIdState(id);
    if (id) getPipeline(id);
    setUpdateModalState(!updateModalState);
  };

  const useDeleteModal = (id: string) => {
    setDeleteIdState(id);
    setDeleteModalState(!deleteModalState);
  };

  const setName = (name: string) => {
    setNameState(name);
  };

  const deletePipeline = async () => {
    await PipelineService.deletePipeline(deleteId);
    useDeleteModal("");
    getPipelines();
  };

  const updatePipeline = async () => {
    await PipelineService.updatePipeline(updateId, name);
    useUpdateModal("");
    getPipelines();
  };

  const createPipeline = async () => {
    await PipelineService.createPipeline(name);
    useCreateModal();
    getPipelines();
  };

  const createDeal = async (data: DealTypes) => {
    await PipelineService.createDeal(data);
    useCreateDealModal();
  };

  const getPipelines = async () => {
    const pipelinesData: pipeline[] = await PipelineService.getPiplines();
    const dealsData: pipeline[] = await DealsService.getDeals();
    setDeals(dealsData);
    const pipes = pipelinesData.map((element) => ({
      ...element,
      deals: [],
    }));
    setPipelines(
      pipes.sort(function (a, b) {
        return a.createdAt < b.createdAt
          ? -1
          : a.createdAt > b.createdAt
          ? 1
          : 0;
      })
    );
    setElements(generateDealsList(pipelinesData, dealsData));
  };

  const getPipeline = async (id: string) => {
    const data: pipeline = await PipelineService.getPipline(id);

    setPipeline(data);
  };

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

  useEffect(() => {
    getPipelines();
  }, []);

  return (
    <PipelineContext.Provider
      value={{
        createModalState,
        useCreateModal,
        updateModalState,
        useCreateDealModal,
        createDealModalState,
        useUpdateModal,
        deleteModalState,
        useDeleteModal,
        deletePipeline,
        updatePipeline,
        createPipeline,
        setName,
        createDeal,
        getPipelines,
        pipelines,
        pipeline,
        onDragEnd,
        dealsList,
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
};

export default PipelineContext;
