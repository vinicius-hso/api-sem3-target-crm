import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DealCardList from "../DealCard/DealCardList";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { ListGrid } from "../DealCard/DealCard.style";
import PipelineContext from "contexts/PipelineContext";

const DragDropContextContainer = styled("div")`
  max-width: 100vw;
`;

const DealPipeline = () => {
  const { onDragEnd, dealsList } = useContext(PipelineContext);
  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {Object.values(dealsList).map((listKey) => (
            <DealCardList
              elements={listKey.deals}
              key={listKey.id}
              title={listKey.name}
              pipeId={listKey.id}
              totalColumnValue={listKey.totalColumnValue}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
};

export default DealPipeline;
