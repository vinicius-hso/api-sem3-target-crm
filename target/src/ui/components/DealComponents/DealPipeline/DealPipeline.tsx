import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DealCardList from "../DealCard/DealCardList";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { ListGrid } from "../DealCard/DealCard.style";

const DragDropContextContainer = styled("div")`
  max-width: 100vw;
`;

const DealPipeline = () => {
  const { pipelines, dealsList, onDragEnd } = usePipelineComponent();

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {pipelines.map((listKey) => (
            <DealCardList
              elements={dealsList[listKey._id]}
              key={listKey._id}
              title={listKey.title}
              pipeId={listKey._id}
              totalColumnValue={listKey.totalColumnValue}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
};

export default DealPipeline;
