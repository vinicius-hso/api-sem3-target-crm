import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DealCardList from "../DealCard/DealCardList";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { ListGrid } from "../DealCard/DealCard.style";
import PipelineContext from "contexts/PipelineContext";

const DragDropContextContainer = styled("div")`
  max-width: 100vw;
`;

const DealPipeline = () => {
  const { dealsList, onDragEnd } = usePipelineComponent();

  const { pipelines } = useContext(PipelineContext)

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {pipelines.map((listKey) => (
            <DealCardList
              elements={listKey.deals}
              key={listKey.id}
              title={listKey.name}
              pipeId={listKey.id}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
};

export default DealPipeline;
