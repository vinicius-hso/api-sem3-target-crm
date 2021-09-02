import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DealCardList from "../DealCard/DealCardList";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";

const DragDropContextContainer = styled("div")`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
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
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
};

export default DealPipeline;
