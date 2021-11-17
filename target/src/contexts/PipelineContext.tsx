import DealsService from "data/services/DealsService";
import PipelineService from "data/services/PipelineService";
import { useRouter } from "next/dist/client/router";
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
  const [dealDetailModalState, setDealDetailModalState] =
    useState<boolean>(false);

  //* ID
  const [updateId, setUpdateIdState] = useState<string>("");
  const [deleteId, setDeleteIdState] = useState<string>("");

  //* DEAL
  const [dealDetail, setDealDetail] = useState({});
  const [name, setNameState] = useState<string>("");
  const [removeElementsFiltered, setRemoveElementsFiltered] = useState([]);
  const [deals, setDeals] = useState<DealTypes[]>([]);
  const [pipelines, setPipelines] = useState<pipeline[]>([]);
  const [pipeline, setPipeline] = useState<pipeline>({} as pipeline);
  const [selectedPipeline, setSelectedPipeline] = useState("");
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [dealTotalParams, setDealTotalParams] = useState({
    budgetSum: 0,
    totalDeals: 0,
    hotDeals: 0,
    warmDeals: 0,
    coldDeals: 0,
  });
  const route = useRouter();

  //FILTRA OS PIPELINES
  const getItems = (pipeId, deals, pipelines) => {
    const pipeDeals = [];
    const currentPipe = pipelines.find((p) => p.id === pipeId);
    let budgetSum = 0,
      totalDeals = 0,
      hotDeals = 0,
      warmDeals = 0,
      coldDeals = 0;
    currentPipe.totalColumnValue = 0;
    deals.map((d) => {
      if (d.pipeline.id === pipeId) {
        pipeDeals.push(d);
        currentPipe.totalColumnValue += Number(d.value);
        budgetSum += Number(d.value);
        totalDeals += 1;
        if (d.activity[d.activity?.length - 1].tag == "HOT") hotDeals += 1;
        else if (d.activity[d.activity?.length - 1].tag == "COLD")
          coldDeals += 1;
        else if (d.activity[d.activity?.length - 1].tag === "WARM")
          warmDeals += 1;
      }
    });
    setDealTotalParams({
      budgetSum: (dealTotalParams.budgetSum += budgetSum),
      totalDeals: (dealTotalParams.totalDeals += totalDeals),
      hotDeals: (dealTotalParams.hotDeals += hotDeals),
      warmDeals: (dealTotalParams.warmDeals += warmDeals),
      coldDeals: (dealTotalParams.coldDeals += coldDeals),
    });
    return pipeDeals;
  };

  //UNI AS DEALS AOS PIPELINES
  const generateDealsList = (pipelines, deals): any[] => {
    dealTotalParams.budgetSum = 0;
    dealTotalParams.totalDeals = 0;
    dealTotalParams.hotDeals = 0;
    dealTotalParams.warmDeals = 0;
    dealTotalParams.coldDeals = 0;
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

  const [dealsList, setElements] = useState([]);

  const UseCreateModal = () => {
    setCreateModalState(!createModalState);
  };

  const UseCreateDealModal = (pipelineId?: string) => {
    setSelectedPipeline(pipelineId);
    setCreateDealModalState(!createDealModalState);
  };

  const UseUpdateModal = async (id: string) => {
    setUpdateIdState(id);
    if (id) await getPipeline(id);
    setUpdateModalState(!updateModalState);
  };

  const UseDeleteModal = (id: string) => {
    setDeleteIdState(id);
    setDeleteModalState(!deleteModalState);
  };

  const UseDealDetailModal = (deal: any) => {
    setDealDetail(deal);
    setDealDetailModalState(!dealDetailModalState);
  };

  const setName = (name: string) => {
    setNameState(name);
  };

  const deletePipeline = async () => {
    await PipelineService.deletePipeline(deleteId);
    setDeleteIdState("id");
    setDeleteModalState(!deleteModalState);
  };

  const updatePipeline = async () => {
    await PipelineService.updatePipeline(updateId, name);
    setUpdateIdState("");
    setUpdateModalState(!updateModalState);
  };

  const createPipeline = async () => {
    await PipelineService.createPipeline(name);
    setCreateModalState(!createModalState);
  };

  const createDeal = async (data: DealTypes) => {
    await PipelineService.createDeal(data);
    setSelectedPipeline("");
    setCreateDealModalState(!createDealModalState);
  };

  const getPipelines = async () => {
    setLoading(true);
    try {
      const pipelinesData: pipeline[] = await PipelineService.getPiplines();
      const dealsData: pipeline[] = await DealsService.getDeals();

      if (pipelinesData?.length) setDeals(dealsData);
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
      setRemoveElementsFiltered(generateDealsList(pipelinesData, dealsData));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar os dados, verifique sua conexão e tente novamente"
      );
    }
  };

  const getPipeline = async (id: string) => {
    setLoading(true);
    try {
      const data: pipeline = await PipelineService.getPipline(id);

      setPipeline(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar os dados, verifique sua conexão e tente novamente"
      );
    }
  };

  //FUNÇÃO QUE REMOVE DEAL DO PIPELINE (APENAS KAMBAN)
  const removeFromList = (list, index) => {
    const result = Array.from(list.deals);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  //FUNÇÃO QUE ADICIONA DEAL AO PIPELINE (APENAS KAMBAN)
  const addToList = (list, index, element) => {
    list.deals.splice(index, 0, element);
    return list;
  };

  //FUNÇÃO BASE DO KAMBAN
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = [...Object.values(dealsList)];

    const sourceList = listCopy.find(
      (pipe) => pipe.id === result.source.droppableId
    );
    const value = sourceList.deals[result.source.index].value;
    sourceList.totalColumnValue -= value;

    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy.find((pipe) => {
      if (pipe.id === result.source.droppableId) {
        pipe.deals = newSourceList;
      }
    });
    const destinationList = listCopy.find((pipe) => {
      if (pipe.id === result.destination.droppableId) {
        return pipe;
      }
    });
    destinationList.totalColumnValue += value;
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    Object.values(listCopy).sort(function (a, b) {
      return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
    });
    const temp = [];
    listCopy.map((a) => temp.push(a));

    if (result.source.droppableId !== result.destination.droppableId) {
      DealsService.dealPipelineUpdate(
        result.destination.droppableId,
        destinationList.deals[result.destination.index].id
      );
    }

    setElements(temp);
    setRemoveElementsFiltered(temp);
  };

  const filterDeals = (
    value: string,
    typeValue: string,
    resetFilter: boolean
  ) => {
    let list = dealsList;
    if (resetFilter) list = [...Object.values(removeElementsFiltered)];
    Object.values(list).forEach((pipe) => {
      const deals = [];
      pipe.deals.forEach((deal) => {
        if (deal.name.toLowerCase().includes(value.toLocaleLowerCase())) {
          deals.push(deal);
        } else {
          switch (typeValue) {
            case "contact":
              if (deal.contact.id.includes(value)) {
                deals.push(deal);
              }
              break;
            case "company":
              if (deal.company.id.includes(value)) {
                deals.push(deal);
              }
              break;
            case "tag":
              if (
                deal.activity[deal.activity?.length - 1].tag.includes(value)
              ) {
                deals.push(deal);
              }
              break;
          }
        }
      });
      pipe.deals = deals;
    });
    setElements(list);
  };

  const removefilterDeals = () => {
    getPipelines();
  };

  useEffect(() => {
    if (route.route === "/") {
      localStorage.removeItem("dealsListFilter");
    }
    if (!pipelines?.length) getPipelines();
  }, []);

  return (
    <PipelineContext.Provider
      value={{
        createModalState,
        UseCreateModal,
        updateModalState,
        UseCreateDealModal,
        createDealModalState,
        UseUpdateModal,
        deleteModalState,
        UseDeleteModal,
        dealDetailModalState,
        UseDealDetailModal,
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
        dealTotalParams,
        filterDeals,
        removefilterDeals,
        selectedPipeline,
        setSelectedPipeline,
        dealDetail,
        isLoading,
        hasError,
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
};

export default PipelineContext;
