import React, { useEffect, useState } from "react";
import { serviceApi } from "data/services/serviceApi";
import { mockDeals, mockPipes } from "data/utils/mock";

export const usePipelineComponent = () => {
  const [pipelines, setPipelines] = useState(mockPipes),
    [deals, setDeals] = useState(mockDeals),
    [hasError, setError] = useState(""),
    [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setElements(generateDealsList());
  }, [deals, pipelines]);

  async function getData() {
    setError("");
    setLoading(true);
    try {
      const pipelinesData = await serviceApi.get("pipelines");
      const dealsData = await serviceApi.get("deals");
      setLoading(false);
      setPipelines(pipelinesData.data);
      setDeals(dealsData.data);
    } catch (err) {
      setLoading(false);
      setError(""); //falta colocar erro
    }
  }

  const getItems = (pipeId) => {
    const pipeDeals = [];
    deals.map((d) => {
      d.pipe === pipeId ? pipeDeals.push(d) : null;
    });
    return pipeDeals;
  };

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const generateDealsList = () =>
    pipelines.reduce(
      (acc, listKey) => ({ ...acc, [listKey._id]: getItems(listKey._id) }),
      {}
    );

  const [dealsList, setElements] = React.useState(generateDealsList());

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
    pipelines,
    dealsList,
    onDragEnd,
    hasError,
    isLoading,
  };
};
